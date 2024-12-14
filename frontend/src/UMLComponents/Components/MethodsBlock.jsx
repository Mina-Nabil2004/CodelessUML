import { useState, useEffect } from "react";
import deleteIcon from '../../assets/deleteIcon.svg'
import Input from "./Input";
import './UMLStyles.css'

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
          <div className="methodsBlock">
            {methodes.map((_, index) => (
              <div key={index} style={{ display: 'flex', alignItems: "center" }}>
                <Input type={"methode"} index={index}/>
                {props.isHovered && 
                    <img className="delete" onClick={() => removeMethod(index)} src={deleteIcon}/>
                }
              </div>
            ))}
          </div>)
      }
      </>
    )
}
export default MethodsBlock