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
    <div className="nameBlock" style={styles}>
      <input
        type="text"
        value={props.name}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          width: 'auto',
          minWidth: '20px',
          fontSize: '20px',
          fontFamily: "'Roboto Mono', monospace",
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      />
    </div>
  )
}

export default NameBlock