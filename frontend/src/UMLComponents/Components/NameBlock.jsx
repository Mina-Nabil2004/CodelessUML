import './UMLStyles.css'

import {
  Handle,
  Position
} from '@xyflow/react';


function NameBlock(props) {
  const styles ={
    nameBlock: {
      backgroundColor: props.color,
      width:`250px`,
    }
  };
  
  return (
    <>
      <Handle id="1" type="target" position={Position.Top} /> 
      <Handle id="10" type="source" position={Position.Top} /> 
      <div style={styles.nameBlock} className="nameBlock">
        {props.name}
      </div>
    </>
  )
}

export default NameBlock