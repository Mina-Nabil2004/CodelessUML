import './UMLStyles.css'
import Input from "./Input";

import {
  Handle,
  Position,
} from '@xyflow/react';

function NameBlock(name) {
  const styles = {
    block: {
      backgroundColor: `${name.color}`
    },
    input: {
      backgroundColor: "red"
    }
  }

  return (
    <div className="nameBlock" style={styles.block}>
      <Input input={name} style={styles.input}/>
    </div>
  )
}

export default NameBlock