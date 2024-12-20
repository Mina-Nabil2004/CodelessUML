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
    class:'#00b6ca',
    abstractClass: '#05008e',
    interface:'#00d131',
    enum: '#dfef52'
  });

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
