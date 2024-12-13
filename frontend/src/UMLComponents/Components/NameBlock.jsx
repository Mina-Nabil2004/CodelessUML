import './UMLStyles.css'

import {
  Handle,
  Position,
} from '@xyflow/react';

function NameBlock(props) { 
  const styles = {
    backgroundColor: `${props.color}`
  }
  return (
    <>
      <Handle id="1" type="target" position={Position.Top} /> 
      <Handle id="10" type="source" position={Position.Top} /> 
      <div className="nameBlock" style={styles}>
        {props.name}
      </div>
    </>
  )
}

export default NameBlock