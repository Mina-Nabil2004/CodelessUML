import { useState, useEffect } from "react";

function MethodsBlock(props) {
  const styles = {
    MethodsBlock: {
      marginTop: "-20px",
      height: `${props.methodesHeight}px`,
      padding: "5px",
      backgroundColor: "white",
      border: "solid black",
      borderRadius: "0px 0px 20px 20px",
      width: `${props.width}px`,
    },

    attribute: {
      width: `${props.width}px`,
      fontSize: "20px",
    },

    delete:{
      marginRight: "-20px",
      width: "10px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "black",
      color: "white",
      fontSize: "10px",
    }
  };
  const [methodes, setMethodes] = useState(Array.from({ length: props.methodesNo }, (_, index) => index));

  useEffect(() => {
    setMethodes(Array.from({ length: props.methodesNo }, (_, index) => index));
  }, [props.methodesNo]);

  const removeMethod = (indexToRemove) => {
    props.setMethodesNo(props.methodesNo-1);
    props.setMethodesHeight(props.methodesHeight - 30);
    setMethodes((prevMethodes) => prevMethodes.filter((_, index) => index !== indexToRemove));
  }

  return (
      <>
        {props.methodesNo != 0 && 
          (
          <div style={styles.methodesBlock}>
            {methodes.map((_, index) => (
              <div key={index} style={{ display: 'flex', alignItems:"center" }}>
                <div style={styles.attribute}>- methode {index+1}</div>
                {props.isHovered && <button style={styles.delete} onClick={() => removeMethod(index)}></button>}
              </div>
            ))}
          </div>)
        }
      </>
    )
}
export default MethodsBlock