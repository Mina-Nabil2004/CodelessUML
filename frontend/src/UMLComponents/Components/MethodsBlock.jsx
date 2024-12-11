import { useState, useEffect } from "react";

function MethodsBlock(props) {

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
          <div style={styles.methodsBlock}>
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