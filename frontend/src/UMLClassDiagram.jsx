import { useCallback } from 'react';
import './index.css';
import {
  ReactFlow, 
  Controls, 
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from '@xyflow/react';

const initialNodes = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: {
      label: (
        <div
          style={{
            height: '100%',
            width: '100%',
            padding: '0', // No padding
            margin: '0',  // No margin
            boxSizing: 'border-box', // Ensures no additional padding
          }}
        >
          <div
            style={{
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold',
              padding: '0px', // No padding inside the header
              margin: '0px',
              textAlign: 'center',
            }}
          >
            <span>Class: `MyClass`</span>
          </div>
          
          <div
            style={{
              borderTop: '1px solid black',
              padding: '0px', // No padding
              margin: '0px',
            }}
          >
          <div style={{ fontStyle: 'italic', margin: '2px' }}>Attributes</div>
            <ul style={{ listStyleType: 'none', padding: '0px', margin: '0px' }}>
              <li>- id: number</li>
              <li>- name: string</li>
              <li>- isActive: boolean</li>
            </ul>
          </div>
          
          <div
            style={{
              borderTop: '1px solid black',
              padding: '0px', // No padding
              margin: '0px',
            }}
          >
            <div style={{ fontStyle: 'italic', margin: '2px' }}>Methods</div>
            <ul style={{ listStyleType: 'none', padding: '0px', margin: '0px' }}>
              <li>+ getId(): number</li>
              <li>+ getName(): string</li>
              <li>+ activate(): void</li>
              <li>+ deactivate(): void</li>
            </ul>
          </div>
        </div>
      ),
    },
  },
  {
    id: '2',
    position: { x: 0, y: 0 },
    data: {
      label: (
        <div
          style={{
            padding: '0px',
            margin: '0px',
            boxSizing: 'border-box',
          }}
        >
          DerivedClass
        </div>
      ),
    },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
];

function UMLClassDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: '#ddd', strokeWidth: 2 }}
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default UMLClassDiagram;
