function NameBlock(props) {
  const styles ={
    nameBlock: {
      height: "35px",
      fontSize: "22px",
      fontWeight: "bold",
      textAlign: "center",
      color: "black",
      padding: "5px",
      border: "solid black",
      borderRadius: "0px 20px 0px 0px",
      backgroundColor: props.color,
      width:`${props.width}px`,
    }
  };
  
  
  return (
      <div style={styles.nameBlock}>
        {props.name}
      </div>
    )
}

export default NameBlock