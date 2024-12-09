import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  SelectionMode,
  useEdgesState,
  useNodesState,
  Panel,
  Handle,
  NodeToolbar,
} from '@xyflow/react';

import UMLClassDiagram from './UMLClassDiagram.jsx';
import '@xyflow/react/dist/style.css';
 
// const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
//   { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
// ];

// const initialNodes = [
//   {
//     id: '1',
//     data: { label: 'Node 1' },
//     position: { x: 150, y: 0 },
//   },
//   {
//     id: '2',
//     data: { label: 'Node 2' },
//     position: { x: 0, y: 150 },
//   },
//   {
//     id: '3',
//     data: { label: 'Node 3' },
//     position: { x: 300, y: 150 },
//   },
// ];
// const panOnDrag = [1, 2];
 
function Flow() {
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  // const onConnect = useCallback(
  //   (connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges],
  // );

  return (
    // <div style={{
    //     width: '100vw',
    //     height: '100vh'
    //   }}>
    //   <ReactFlow
    //     nodes={nodes}
    //     edges={edges}
    //     onNodesChange={onNodesChange}
    //     onEdgesChange={onEdgesChange}
    //     onConnect={onConnect}
    //     panOnScroll
    //     selectionOnDrag
    //     panOnDrag={panOnDrag}
    //     selectionMode={SelectionMode.Partial}
        
    //   >
    //     <Background BackgroundColor='white' variant="dots" gap={12} size={1}/>
    //     <Controls position='bottom-right' orientation='horizontal' style={{
    //       border: 'solid 1px'
    //     }}/>

    //     <Handle/>
    //     <NodeToolbar/>
    //     <Panel />
    //   </ReactFlow>
    // </div>
    <UMLClassDiagram/>
  );
}
 
export default Flow;