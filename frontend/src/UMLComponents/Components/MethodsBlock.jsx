import { useState, useEffect } from "react";
import './UMLStyles.css'

function MethodsBlock(props) {

  const styles = {
    methodsBlock: {
      height: `${props.methodesHeight}px`,
      width: `${props.width}px`,
    },

    methode: {
      width: `${props.width}px`,
    },
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
          <div className="methodsBlock" style={styles.methodsBlock}>
            {methodes.map((_, index) => (
              <div key={index} style={{ display: 'flex', alignItems:"center" }}>
                <div className="method" style={styles.methode}>- methode {index+1}</div>
                {props.isHovered && <button className="delete" onClick={() => removeMethod(index)}></button>}
              </div>
            ))}
          </div>)
        }
      </>
    )
}
export default MethodsBlock