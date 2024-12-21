import { useCallback } from "react";
import Input from "./Input";
import './UMLStyles.css';
import deleteIcon from '../../assets/DeleteIcon.svg';

function MethodsBlock({ methods, setMethods, attributes, isHovered, setIsHovered, addMethode }) {

  const removeMethod = useCallback((indexToRemove) => {
    setMethods((prevMethods) => prevMethods.filter((_, index) => index !== indexToRemove));
  }, [setMethods]);

  const updateMethod = useCallback((index, newValue) => {
    setMethods((prevMethods) => prevMethods.map((method, i) => i === index ? newValue : method));
  }, [setMethods]);

  return (
    methods.length !== 0 &&
    <div className="methodsBlock" style={{ marginTop: attributes.length === 0 ? 0 : '-19px', paddingBottom: attributes.length === 0 ? "5px" : '10px' }}>
      {methods.map((method, index) => (
        <div key={index} style={{ display: 'flex', alignItems: "center" }}>
          <Input
            typeName={"method"}
            index={index}
            input={`method ${index + 1}`}
            setInput={(newValue) => updateMethod(index, newValue)}
          />
          <span>&nbsp;:&nbsp;</span>
          <Input
            input={"type"}
            setInput={(newValue) => console.log(`Type for method ${index} changed to ${newValue}`)}
          />
          {isHovered && (
            <img
              className="delete"
              onClick={() => removeMethod(index)}
              src={deleteIcon}
              alt="Delete"
            />
          )}
        </div>
      ))}
      {isHovered && methods.length > 0 && attributes.length > 0 && (
        <button className="method-button" onClick={addMethode} onMouseEnter={() => setIsHovered(true)}>
          + method
        </button>
      )}
    </div>
  );
}

export default MethodsBlock;