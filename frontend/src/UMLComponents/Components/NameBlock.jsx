import './UMLStyles.css'
import Input from "./Input";

import {
  Handle,
  Position,
} from '@xyflow/react';

function NameBlock({ name, color }) {
  const styles = {
    backgroundColor: `${color}`
  }

  return (
    <div className="nameBlock" style={styles}>
      <Input input={name} />
    </div>
  )
}

export default NameBlock