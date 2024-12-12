import { useCallback } from 'react';
import './index.css';

import ClassNode from './UMLComponents/ClassNode.jsx';
import InterfaceNode from './UMLComponents/InterfaceNode.jsx';
import EnumNode from './UMLComponents/EnumNode.jsx';
import AbstractClassNode from './UMLComponents/AbstractClassNode.jsx';

import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from '@xyflow/react';

const nodeTypes = {
  class: ClassNode,
  interface: InterfaceNode,
  enum: EnumNode,
  abstractClass: AbstractClassNode
}

const nodes = [
  {
    id: '1',
    type: 'class',
    position: { x: 100, y: 100 },
    data: {
      scope: "public",

      relations: {
        extendsId: 3,
        implements: [5, 2, 8, 9, 7]
      },

      attributes: [
        {
          type: "String",
          name: "car",
          scope: "public",
          isStatic: false,
          getter: false,
          setter: false,
          final: false
        }
      ],

      methods: [
        {
          name: "findName",
          returnType: "int",
          scope: "public",
          isStatic: false,
          parameters: [{ "type": "int", "name": "amount" }, { "type": "String", "name": "param" }]
        }
      ],

      constructors: [
        {
          scope: "public",
          parameters: [{ "type": "int", "name": "amount" }, { "type": "String", "name": "param" }]
        }
      ]
    }
  }
]

const initialNodes = [...nodes]

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