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
      <div className="nameBlock" style={styles}>
        {props.name}
      </div>
    </>
  )
}

export default NameBlock