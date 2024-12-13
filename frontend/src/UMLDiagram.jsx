import { useCallback } from 'react';
import './index.css';

import ClassNode from './UMLComponents/ClassNode.jsx';
import InterfaceNode from './UMLComponents/InterfaceNode.jsx';
import EnumNode from './UMLComponents/EnumNode.jsx';
import AbstractClassNode from './UMLComponents/AbstractClassNode.jsx';
import { initialNodes } from './nodes.js';

import {
  ReactFlow,
  // Handle,
  // Position,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position
} from '@xyflow/react';

const nodeTypes = {
  class: ClassNode,
  interface: InterfaceNode,
  enum: EnumNode,
  abstractClass: AbstractClassNode
}


const initialEdges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
  },
];

function UMLDiagram() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: '#ddd', strokeWidth: 2 }}
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Controls />
        <Background style={{ zIndex: -1 }} color="#000000" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default UMLDiagram;