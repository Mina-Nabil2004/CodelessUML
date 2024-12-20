import {
   MarkerType,
 } from '@xyflow/react';

const association = {
   id: 'A->B',
   source: 'A',
   target: 'B',
   markerEnd: {
      type: MarkerType.Arrow
   }
}

const inheritance = {
   id: 'A->B',
   source: 'A',
   target: 'B',
   markerEnd: {
      type: MarkerType.ArrowClosed,
   }
}


const implementation = {
   id: 'A->B',
   source: 'A',
   target: 'B',
   markerEnd: {
      type: MarkerType.ArrowClosed,
   },
   type: 'dashed'
}
const dependency = {
   id: 'A->B',
   source: 'A',
   target: 'B',
   markerEnd: {
      type: MarkerType.Arrow,
   },
   type: 'dashed'
}

const composition = {
   id: 'A->B',
   source: 'A',
   target: 'B',
   markerEnd: {
      type: MarkerType.Arrow,
   },
}


