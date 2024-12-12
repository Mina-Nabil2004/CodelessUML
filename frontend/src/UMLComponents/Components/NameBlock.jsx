import './UMLStyles.css'

function NameBlock(props) {
  const styles ={
    nameBlock: {
      backgroundColor: props.color,
      width:`250px`,
    }
  };
  
  return (
    <div style={styles.nameBlock} className="nameBlock">
      {props.name}
    </div>
  )
}

export default NameBlock