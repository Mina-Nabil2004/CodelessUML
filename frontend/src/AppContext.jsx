import React, { createContext, useEffect, useContext, useCallback, useState, useRef } from 'react';
import { abstractClassNode, classNode, enumNode, initialNodes, interfaceNode } from './nodes.js';
import { dependency, inheritance, association, composition, implementation } from './edges.jsx';

import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SmoothStepEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from '@xyflow/react';
import { func } from 'prop-types';
import TextFrame from './Textframe.jsx';


const NodeTypes ={
  class: classNode,
  interface: interfaceNode,
  abstractClass: abstractClassNode,
  enum: enumNode,
}


const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const documentRef = useRef(document);
  const [projectName, setProjectName] = useState("Project Name");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  
  const [generatedCodes, setGeneratedCodes] = useState([]);

  const [focusedItem, setFocusedItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [treeItems, setTreeItems] = useState({
    virtualRoot: {
      index: 'virtualRoot',
      isFolder: true,
      children: ['root'],
      data: '',
    },
    root: {
      index: 'root',
      canMove: true,
      isFolder: true,
      children: [],
      data: 'src',
      canRename: true,
      parentId: 'virtualRoot'
    }
  });

  const [nodeColors, setNodeColors] = useState({
    class:'#0fd2e8',
    abstractClass: '#d256ce',
    interface:'#04da00',
    enum: '#e9ff23'
  });

  const [selectedEdgeType, setSelectedEdgeType] = useState(association)
  const [copied, setCopied] = useState([])
  const undoStack= useRef([])
  const redoStack = useRef([])
  function nodeExists(id) {
    return nodes.some((node) => node.id === id)
  }

  /*
   * When key is 'package' value must be the package id (index).
   * This function handles all the side effects, and should be the exposed
   * function for all other components to use.
   */
  function updateNode(id, key, value) {
    takeAction()
    switch (key) {
      case 'package':
        moveTreeItems([treeItems[id]], value)
        if (nodeExists(id)) updateNodeData(id, 'package', treeItems[value].data)
        return
      case 'name':
        renameTreeItem(id, value)
        if (nodeExists(id)) {
          updateNodeData(id, 'name', value)
        }
        else {
          treeItems[id].children.forEach((item) => {
            if (!treeItems[item].isFolder) {
              console.log(item, 'package', value)
              updateNodeData(item, 'package', value)
            }
          })
        }
        break
      default:
        updateNodeData(id, key, value)
        break
    }
  }


  function updateNodeData(id, key, value){
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, [key]: value } } : node
      )
    )
  }


  const takeAction = useCallback(() => {
    const action = {
      nodes: structuredClone(nodes),
      edges: structuredClone(edges),
      nodeColors: structuredClone(nodeColors),
      treeItems: structuredClone(treeItems)};
    undoStack.current.push(action)
    redoStack.current = []
    console.log('Undo stack:', undoStack.current)
  }, [nodes, edges, nodeColors, treeItems])


  const handleUndo = () => {
    console.log('Undo stack:', undoStack)
    if (undoStack.current.length === 0) return
    const currentState = {
      nodes: structuredClone(nodes),
      edges: structuredClone(edges),
      nodeColors: structuredClone(nodeColors),
      treeItems: structuredClone(treeItems)};
    const previousState = undoStack.current.pop();
    redoStack.current.push(currentState)
    console.log('Current state:', currentState)
    console.log('Previous state:', previousState)
    setNodes(previousState.nodes);
    setEdges(previousState.edges);
    setNodeColors(previousState.nodeColors);
    setTreeItems(previousState.treeItems);
    setFocusedItem(null)
    setSelectedItems([])
  }

  const handleRedo = () => {
    console.log('Redo stack:', redoStack)
    if (redoStack.current.length === 0) return
    const currentState = {
      nodes: structuredClone(nodes),
      edges: structuredClone(edges),
      nodeColors: structuredClone(nodeColors),
      treeItems: structuredClone(treeItems)};
    const nextState = redoStack.current.pop();
    undoStack.current.push(currentState)
    console.log('Next state:', nextState)
    setNodes(nextState.nodes);
    setEdges(nextState.edges);
    setNodeColors(nextState.nodeColors);
    setTreeItems(nextState.treeItems)
    setFocusedItem(null)
    setSelectedItems([])
  }

  function handleMouseDragStart(event, node) {
    takeAction()
    console.log(`Node ${node.id} moved to`, node.position); // Log the node movement
    setNodes((nds) => {
    // Capture the current state before updating
    const updatedNodes = nds.map((n) => 
      (n.id === node.id ? { ...n, position: node.position } : n)
    );

    console.log(`Node ${node.id} moved to`, node.position); // Log the node movement
    return updatedNodes;
  });
  }

  function createNode(type) {
    takeAction()
    console.log('Creating node with type:', type)

    const targetIndex = focusedItem ?
        (treeItems[focusedItem].isFolder ? focusedItem : treeItems[focusedItem].parentId)
        : 'root'

    const node = NodeTypes[type]

    console.log('Creating:', node)

    const newNode = {
      ...node,
      id: generateUniqueId(),
      data: {
        ...node.data,
        package: treeItems[targetIndex].data
      }}

    console.log('New node:', newNode)
    setNodes((prevNodes) => ([...prevNodes, newNode]))
    addTreeItems([newNode], targetIndex)
  }


  function deleteNode(id) {
    takeAction()
    const { updatedTreeItems, updatedNodes } = deleteNodeRec(id, treeItems, nodes);
    const updatedSelectedItems = selectedItems.filter((selectedItem) => (selectedItem.index !== id))
    setNodes(() => updatedNodes);
    setTreeItems(() => updatedTreeItems);
    setSelectedItems(() => updatedSelectedItems)
    setFocusedItem(() => (focusedItem === id)? null : focusedItem)
  }

  function deleteNodeRec(id, treeItems, nodes) {
    console.log('rec', id, treeItems, nodes)
    let updatedTreeItems = treeItems
    let updatedNodes = nodes

    if (nodes.some((node) => node.id === id)) {
      updatedNodes = nodes.filter((node) => node.id !== id);
    }
    else {
      updatedTreeItems[id].children.forEach((child) => {
        ({updatedTreeItems, updatedNodes} =
            deleteNodeRec(child, updatedTreeItems, updatedNodes))
      })
    }

    updatedTreeItems = deleteTreeItem(updatedTreeItems[id], updatedTreeItems)
    return { updatedTreeItems,  updatedNodes }
  }

  /*
   * Since this function is used recursively so it must not set the useState
   * instead it must return the updated list for the calling function to set.
   */
  // function deleteEdges(ids) {
  //   return edges.filter((edge) => !ids.includes(edge.source) && !ids.includes(edge.target))
  // }


  // useEffect(() => {
  //   if (undoRedoOperation.current) {
  //     undoRedoOperation.current = false
  //     return
  //   }
  //   if (!batchOperation.current) {
  //     takeAction();
  //   }
  // }, [nodes, edges, nodeColors, treeItems]);

  useEffect(() => {
    takeAction()
  }, []);

  function addTreePackage(item) {
    const itemIndex = item.index

    const newFolderId = `package-${Date.now()}`;
    const newFolder = {
      index: newFolderId,
      isFolder: true,
      children: [],
      data: 'new_package',
      canRename: true,
      parentId: itemIndex,
    };

    const updatedTreeItems = { ...treeItems };

    // Add new folder to tree
    updatedTreeItems[newFolderId] = newFolder;

    // Add package to its parent children array
    updatedTreeItems[itemIndex] = {
      ...updatedTreeItems[itemIndex],
      children: [...updatedTreeItems[itemIndex].children, newFolderId],
    };

    setTreeItems(updatedTreeItems);

    takeAction()
  }


  function addTreeItems(newNodes, targetIndex) {
    console.log('Adding new node to project tree...')

    console.log('Adding class to package: ', targetIndex)

    let updatedTreeItems = structuredClone(treeItems)

    newNodes.map(((node) => {
      const treeClassItem = {
        index: node.id,
        isFolder: false,
        children: [],
        data: node.data.name,
        parentId: targetIndex
      }
      console.log('Adding item:', treeClassItem, 'to the tree')

      // Add new tree class item to the tree
      updatedTreeItems[node.id] = treeClassItem

      // Append new tree class to target package children list
      const targetItem = updatedTreeItems[targetIndex]
      updatedTreeItems[targetIndex] = {
        ...targetItem,
        children: [...targetItem.children, treeClassItem.index]
      }

      return treeClassItem
    }))

    setTreeItems(() => updatedTreeItems)
  }

  function cloneTreeItems(newNodes) {
    console.log('Adding new nodes to project tree...')

    let updatedTreeItems = structuredClone(treeItems)

    newNodes.map(((node) => {
      const newId = generateUniqueId()
      const treeClassItem = {
        index: newId,
        isFolder: false,
        children: [],
        data: node.data.name,
        parentId: treeItems[node.id].parentId
      }

      // Add new tree class item to the tree
      updatedTreeItems[newId] = treeClassItem

      // Append new tree class to target package children list
      const targetItem = treeItems[treeItems[node.id].parentId]
      updatedTreeItems[targetItem.index] = {
        ...targetItem,
        children: [...targetItem.children, treeClassItem.index]
      }

      return treeClassItem
    }))
    console.log('Updated tree items:', updatedTreeItems)
    setTreeItems(() => updatedTreeItems)
  }

  function renameTreeItem(itemIndex, name) {
    const updatedTreeItems = { ...treeItems };

    updatedTreeItems[itemIndex].data = name;

    setTreeItems(() => updatedTreeItems);
  }

  function moveTreeItems(items, targetIndex) {
    const targetItem = treeItems[targetIndex];
    const updatedTreeItems = { ...treeItems };

    items.forEach((item) => {
      if (item.parentId) {
        if (targetItem.index === item.parentId) return;

        const parentItem = treeItems[item.parentId];
        const updatedChildren = parentItem.children.filter((c) => c !== item.index);
        updatedTreeItems[item.parentId] = {
          ...parentItem,
          children: updatedChildren,
        };
      }

      updatedTreeItems[targetItem.index] = {
        ...targetItem,
        children: [...targetItem.children, item.index],
      };

      updatedTreeItems[item.index] = {
        ...item,
        parentId: targetItem.index,
      };
    });

    setTreeItems(() => updatedTreeItems);
  }


  function deleteTreeItem(item, treeItems){
    if (!item || item.index === 'root') return

    console.log('Deleting item: ', item, 'from tree items:', treeItems);
    const updatedTreeItems = { ...treeItems };

    // Delete tree item
    delete updatedTreeItems[item.index];

    // Delete tree item from children list of all items
    for (const treeItemKey in updatedTreeItems) {
      let treeItem = updatedTreeItems[treeItemKey]
      if (treeItem.isFolder) {
        treeItem = {
          ...treeItem,
          children: treeItem.children.filter((i) => i !== item.index)
        }
        updatedTreeItems[treeItem.index] = treeItem;
      }
    }
    return updatedTreeItems
  }

  function generateUniqueId() {
    return crypto.randomUUID();
  }

  function getCode() {
    const generatedCode = generatedCodes.find((element) => element.id === focusedItem);

    // Return the code if the object exists, otherwise return null or undefined
    return generatedCode ? generatedCode.code : "";
  }


  // copy and paste
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) { // Support both Ctrl and Command keys
        if (event.key.toLowerCase() === 'c') {
          console.log(selectedItems)
          // Copy selected nodes and edges
          setCopied({
            nodes: nodes.filter((node) => selectedNodes.includes(node.id)),
            edges: edges.filter((edge) =>
              selectedEdges.includes(edge.id) ||
              selectedNodes.includes(edge.source) ||
              selectedNodes.includes(edge.target)
            ),
          });
        } else if (event.key.toLowerCase() === 'v' && copied.nodes.length > 0) {
          // Paste copied nodes and edges
          const nodeIdMap = {}; // Map old IDs to new IDs
  
          const newNodes = copied.nodes.map((node, index) => {
            // const newId = `${node.id}_copy_${index}`;
            const newId = generateUniqueId();

            nodeIdMap[node.id] = newId;

            return {
              ...node,
              id: newId,
              position: {
                x: node.position.x + 25, // Offset to avoid overlap
                y: node.position.y + 25,
              },
              selected: false,
            };
          });
  
          const newEdges = copied.edges.map((edge) => ({
            ...edge,
            id: generateUniqueId(),
            source: nodeIdMap[edge.source] || edge.source,
            target: nodeIdMap[edge.target] || edge.target,
          }));
  
          setNodes((prevNodes) => [...prevNodes, ...newNodes]);
          cloneTreeItems(copied.nodes)
          if(newNodes.length == 1) return;
          setEdges((prevEdges) => [...prevEdges, ...newEdges]);
        }

      } else if(event.altKey || event.metaKey) {

        if(event.key.toLowerCase() == 'c') {
          createNode('class');
          
        } else if(event.key.toLowerCase() == 'i') {
          createNode('interface');
          
        } else if(event.key.toLowerCase() == 'a') {
          createNode('abstractClass');
          
        } else if(event.key.toLowerCase() == 'e') {
          createNode('enum');
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nodes, edges, copied, selectedNodes, selectedEdges]);
  
  function handleOnNodesDelete(deleted) {
    takeAction();
    deleted.map((node) => deleteNode(node.id))
  }

  const handleNodesChange = useCallback((changes) => {
    onNodesChange(changes);
    const selected = changes
      .filter((change) => change.selected) // Filter selected nodes
      .map((node) => node.id); // Map to IDs
    
    setSelectedNodes(selected);
  }, [onNodesChange]);


  return (
    <AppContext.Provider
      value={{
        documentRef,
        projectName, setProjectName,
        nodes, setNodes, onNodesChange,
        edges, setEdges, onEdgesChange,
        nodeColors, setNodeColors,
        selectedEdgeType, setSelectedEdgeType,
        createNode,
        updateNode,
        deleteNode,
        deleteTreeItem,
        moveTreeItems,
        updateNodeData,
        generateUniqueId,
        getCode,
        generatedCodes, setGeneratedCodes,
        handleOnNodesDelete, 
        // onEdgesDelete,
        selectedNodes, setSelectedNodes,
        selectedEdges, setSelectedEdges,
        focusedItem, setFocusedItem,
        expandedItems, setExpandedItems,
        selectedItems, setSelectedItems,
        treeItems, setTreeItems,
        takeAction,
        handleUndo, handleRedo,
        undoStack, redoStack,
        handleMouseDragStart,
        addTreePackage,
        addTreeItems
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext)
