import React, { createContext, useEffect, useContext, useCallback, useState } from 'react';
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
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);

  const [nodeColors, setNodeColors] = useState({
    class:'#0fd2e8',
    abstractClass: '#d256ce',
    interface:'#04da00',
    enum: '#e9ff23'
  });

  const [selectedEdgeType, setSelectedEdgeType] = useState(dependency)
  
  const [copied, setCopied] = useState([])

  const updateNodeData = (id, key, value) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, [key]: value } } : node
      )
    );
  };

  function deleteNode(id) { // 
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    deleteEdges(id);
  }
  
  function deleteEdges(ids) {
    setEdges((prevEdges) =>
      prevEdges.filter((edge) => !ids.includes(edge.source) && !ids.includes(edge.target))
    );
  }
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        if (event.key.toLowerCase() === 'c') {
          console.log(edges)
          setCopied(selectedNodes);
        } else if (event.key.toLowerCase() === 'v') {
          // setNodes((prevNodes) => [...prevNodes, ...copied]);
          // setNodes((prevNodes) => [...prevNodes,{ ...interfaceNode, id: `${nodes.length}` }]);
          for (const newNode in copied) {
            setNodes((prevNodes) => [...prevNodes, {...newNode, id: `${nodes.length}`}]);
          }
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNodes, setNodes]);



  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === 'Delete' && selectedNodes.length > 0) {
  //       setNodes((currentNodes) =>
  //         currentNodes.map((node) => {
  //           if (!selectedNodes.includes(node.id)) {
  //             // Ensure `relations` and `implements` exist
  //             if (node.data?.relations) {
  //               // Remove `extendsId` if it matches a selected node
  //               if (selectedNodes.includes(node.data.relations.extendsId)) {
  //                 node.data.relations.extendsId = null;
  //               }

  //               // Filter `implements` array if it exists
  //               if (Array.isArray(node.data.relations.implements)) {
  //                 node.data.relations.implements = node.data.relations.implements.filter(
  //                   (value) => !selectedNodes.includes(value)
  //                 );
  //               }
  //             }

  //             return node; // Return updated node
  //           }
  //           return null; // Mark node for removal if in selectedNodes
  //         }).filter((node) => node !== null) // Remove null nodes
  //       );
  //     }
  //   };
  
  //   window.addEventListener('keydown', handleKeyDown);
  
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [selectedNodes, setNodes]);


  // const onNodesDelete = useCallback((deleted) => {
  //   setEdges(
  //     deleted.reduce((acc, node) => {
  //       // const incomers = getIncomers(node, nodes, edges);
  //       // const outgoers = getOutgoers(node, nodes, edges);
  //       const connectedEdges = getConnectedEdges([node], edges);

  //       const remainingEdges = acc.filter(
  //         (edge) => !connectedEdges.includes(edge),
  //       );

  //       // const createdEdges = incomers.flatMap(({ id: source }) =>
  //       //   outgoers.map(({ id: target }) => ({
  //       //     id: `${source}->${target}`,
  //       //     source,
  //       //     target,
  //       //   })),
  //       // );

  //       // return [...remainingEdges, ...createdEdges];
  //       return [...remainingEdges];
  //     }, edges),
  //   );
  // }, [nodes, edges],);

  // const onEdgesDelete = useCallback((deleted) => {
  //   setEdges(
  //     deleted.reduce((acc, node) => {
  //       // const incomers = getIncomers(node, nodes, edges);
  //       // const outgoers = getOutgoers(node, nodes, edges);
  //       const connectedEdges = getConnectedEdges([node], edges);

  //       const remainingEdges = acc.filter(
  //         (edge) => !connectedEdges.includes(edge),
  //       );

  //       // const createdEdges = incomers.flatMap(({ id: source }) =>
  //       //   outgoers.map(({ id: target }) => ({
  //       //     id: `${source}->${target}`,
  //       //     source,
  //       //     target,
  //       //   })),
  //       // );

  //       // return [...remainingEdges, ...createdEdges];
  //       return [...remainingEdges];
  //     }, edges),
  //   );
  // }, [nodes, edges],);

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
        nodes, setNodes, onNodesChange,
        edges, setEdges, onEdgesChange,
        nodeColors, setNodeColors,
        selectedEdgeType, setSelectedEdgeType,
        updateNodeData, 
        // onNodesDelete, 
        // onEdgesDelete,
        selectedNodes, setSelectedNodes,
        selectedEdges, setSelectedEdges
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
