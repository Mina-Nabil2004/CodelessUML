import { useCallback } from 'react';
import './index.css';

import ClassNode from './UMLComponents/ClassNode.jsx';
import InterfaceNode from './UMLComponents/InterfaceNode.jsx';
import EnumNode from './UMLComponents/EnumNode.jsx';
import AbstractClassNode from './UMLComponents/AbstractClassNode.jsx';
import { abstractClassNode, classNode, initialNodes, interfaceNode } from './nodes.js';

import '@xyflow/react/dist/style.css';

import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SmoothStepEdge
} from '@xyflow/react';

const nodeTypes = {
  class: ClassNode,
  interface: InterfaceNode,
  enum: EnumNode,
  abstractClass: AbstractClassNode
};

const edgeTypes = {
  smoothstep: SmoothStepEdge,
};

const initialEdges = [
  // Add any initial edges here if needed
];

function UMLDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  function createClass() {
    setNodes((prevNodes) => [...prevNodes,{ ...classNode, id: `${nodes.length}` }]);
  }

  function createInterface() {
    setNodes((prevNodes) => [...prevNodes,{ ...interfaceNode, id: `${nodes.length}` }]);
  }

  function createAbstractClass() {
    setNodes((prevNodes) => [...prevNodes,{ ...abstractClassNode, id: `${nodes.length}` }]);
  }
  

  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          style: { stroke: 'black', strokeWidth: 2 },
          type: 'smoothstep',
        },
        eds
      )
    );
  }, [setEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: '#000000', strokeWidth: 2 }}
        connectionLineType="smoothstep"
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Controls className='controls' orientation="horizontal" position='bottom-right'/>
        <Background style={{ zIndex: -1 }} gap={16} />
      </ReactFlow>

      <button onClick={() => {createClass()}} style={{
        position: 'absolute',
        bottom: '50px'
      }}>
        3abeet
      </button>

      <button onClick={() => {createInterface()}} style={{
        position: 'absolute',
        bottom: '70px'
      }}>
        3abeet interface
      </button>

      <button onClick={() => {createAbstractClass()}} style={{
        position: 'absolute',
        bottom: '80px'
      }}>
        3abeet abstract class
      </button>
    </div>
  );
}

export default UMLDiagram;
