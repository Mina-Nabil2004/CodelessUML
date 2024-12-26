import './UMLStyles.css'
import Input from "./Input";

function NameBlock({ name, color, id }) {

  const styles = {
    backgroundColor: `${color}`
  }

  return (
    <div className="nameBlock" style={styles}>
      <Input input={name} id={id} type="name"/>
    </div>
  )
}

export default NameBlock