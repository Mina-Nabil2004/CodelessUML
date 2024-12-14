import React, { createContext, useContext, useState } from 'react';
import { abstractClassNode, classNode, enumNode, initialNodes, interfaceNode } from './nodes.js';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SmoothStepEdge
} from '@xyflow/react';
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodeColors, setNodeColors] = useState({
    class:'blue',
    interface:'#a30096',
    abstractClass: '#2ab600',
    enum: '#00776b'
  })

  return (
    <AppContext.Provider
      value={{
        nodeColors, setNodeColors,
        nodes, setNodes, onNodesChange,
        edges, setEdges, onEdgesChange
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
