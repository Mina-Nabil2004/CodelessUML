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

  // function getNodeId() {
    
  // }
  

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.ctrlKey) {
  //       if (event.key.toLowerCase() === 'c') {
  //         // Copy selected nodes
  //         setCopied(selectedNodes);
  //       } else if (event.key.toLowerCase() === 'v') {
  //         // Paste copied nodes
  //         setNodes((prevNodes) => {
  //           return [
  //             ...prevNodes,
  //             ...selectedNodes.map((node, index) => ({
  //               ...node, id: `${prevNodes.length + index + 1}`, // Generate unique ID
  //             })),
  //           ];
  //         });
  //       }
  //     }
  //   };
  
  //   window.addEventListener('keydown', handleKeyDown);
  
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [selectedNodes, setNodes, setCopied]);
  



  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) { // Support both Ctrl and Command keys
        if (event.key.toLowerCase() === 'c') {
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
            const newId = `${node.id}_copy_${index}`;
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
            id: `${edge.id}_copy`,
            source: nodeIdMap[edge.source] || edge.source,
            target: nodeIdMap[edge.target] || edge.target,
          }));
  
          setNodes((prevNodes) => [...prevNodes, ...newNodes]);
          if(newNodes.length == 1) return;
          setEdges((prevEdges) => [...prevEdges, ...newEdges]);
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nodes, edges, copied, selectedNodes, selectedEdges]);
  

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
