import './UMLStyles.css'

function NameBlock(props) {
  const styles ={
    nameBlock: {
      backgroundColor: props.color,
      width:`${props.width}px`,
    }
  };
  
  return (
    <div style={styles.nameBlock} className="nameBlock">
      {props.name}
    </div>
  )
}

export default NameBlock