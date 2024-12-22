import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function Dot( id ) {
  return (
    <>
      {/* <Handle id={`${id}-1`} type="source" position={Position.Right} style={{transform: 'translateY(-10px)', transform:'translateX(3.5px)'}}/>
      <Handle id={`${id}-2`} type="target" position={Position.Right} style={{transform: 'translateY(-10px)', transform:'translateX(3.5px)'}}/>
      
      <Handle id={`${id}-11`} type="source" position={Position.Right} style={{transform: 'translateY(40px)', transform:'translateX(3.5px)'}}/>
      <Handle id={`${id}-22`} type="target" position={Position.Right} style={{transform: 'translateY(40px)', transform:'translateX(3.5px)'}}/>

      <Handle id={`${id}-3`} type="source" position={Position.Left} />
      <Handle id={`${id}-4`} type="target" position={Position.Left} />

      <Handle id={`${id}-33`} type="source" position={Position.Left} />
      <Handle id={`${id}-44`} type="target" position={Position.Left} />

      <Handle id={`${id}-5`} type="source" position={Position.Bottom} style={{transform: 'translateY(-8px)', transform:'translateX(-2px)'}} />
      <Handle id={`${id}-6`} type="target" position={Position.Bottom} style={{transform: 'translateY(-8px)', transform:'translateX(-2px)'}} />

      <Handle id={`${id}-7`} type="source" position={Position.Top} style={{transform: 'translateY(30px)'}}/>
      <Handle id={`${id}-8`} type="target" position={Position.Top} style={{transform: 'translateY(30px)'}}/> */}

      <Handle id={`${id}-3OUT`} type="source" position={Position.Top} style={{
        height: '20px',
        width: '90%',
        opacity: '0',
        borderRadius: "0"
      }}/>
      <Handle id={`${id}-3IN`} type="target" position={Position.Top} style={{
        height: '20px',
        width: `90%`,
        opacity: '0',
        borderRadius: "0"
      }}/>

      <Handle id={`${id}-1OUT`} type="source" position={Position.Left} style={{
        height: '90%',
        width: '20px',
        opacity: '0',
        borderRadius: "0"
      }}/>
      <Handle id={`${id}-1IN`} type="target" position={Position.Left} style={{
        height: '90%',
        width: '20px',
        opacity: '0',
        borderRadius: "0"
      }}/>

      <Handle id={`${id}-2OUT`} type="source" position={Position.Right} style={{
        height: '90%',
        width: '20px',
        opacity: '0',
        borderRadius: "0"
      }}/>
      <Handle id={`${id}-2IN`} type="target" position={Position.Right} style={{
        height: '90%',
        width: '20px',
        opacity: '0',
        borderRadius: "0"
      }}/>
      
      
      <Handle id={`${id}-4OUT`} type="source" position={Position.Bottom} style={{
        height: '30px',
        width: `90%`,
        opacity: '0',
        borderRadius: "0"
      }}/>
      <Handle id={`${id}-4IN`} type="target" position={Position.Bottom} style={{
        height: '30px',
        width: `90%`,
        opacity: '0',
        borderRadius: "0"
      }}/>
    </>
  );
}