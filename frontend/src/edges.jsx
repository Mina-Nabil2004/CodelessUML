import compositionIcon from './assets/compositionIcon.svg';

import {
   MarkerType,
 } from '@xyflow/react';

export const association = {
   name: 'association',
   type: 'smoothstep',
   style: { stroke: 'black', strokeWidth: 2 },
   markerStart: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: 'black',
   }
}

export const inheritance = {
   name: 'inheritance',
   style: { stroke: 'black', strokeWidth: 2 },
   type: 'smoothstep',
   markerStart: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: 'black',
   }
}


export const implementation = {
   name: 'implementation',
   style: { stroke: 'blue', strokeWidth: 2 , strokeDasharray: '5,5'},
   markerStart: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: 'black',
   },
   type: 'smoothstep'
}

export const dependency = {
   name: 'dependency',
   markerStart: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: 'black',
   },
   type: 'smoothstep',
   style: { stroke: 'black', strokeWidth: 2, strokeDasharray: '5,5' },
}

export const composition = {
   name: 'composition',
   style: { stroke: 'black', strokeWidth: 2 },
   markerStart:'composition-marker',
   
   // markerEnd: { type: 'custom', id: 'composition-marker' },
   type: 'smoothstep',
}




export default function Comp() {
   return (
      <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <defs>
            <marker
               id="composition-marker"
               viewBox="0 0 36 36"
               refX="18"
               refY="18"
               markerWidth="18"
               markerHeight="18"
               orient="auto"
            >
               <rect x="35.832" y="17.916" width="15" height="15" transform="rotate(135 35.832 17.916)" fill="black" />

            </marker>
         </defs>
      </svg>
   )
}

