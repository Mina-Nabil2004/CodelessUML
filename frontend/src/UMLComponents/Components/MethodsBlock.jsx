import { useCallback } from "react";
import Input from "./Input";
import './UMLStyles.css';
import deleteIcon from '../../assets/DeleteIcon.svg';
import Properties from "./Properties";
import Parameters from "./Parameters";

function MethodsBlock({ methods, setMethods, attributes, isHovered, setIsHovered, addMethode, updateNodeData  }) {

  const removeMethod = useCallback((indexToRemove) => {
    setMethods((prevMethods) => prevMethods.filter((_, index) => index !== indexToRemove));
  }, [setMethods]);

  const updateMethodAttribute = useCallback((index, attribute, value) => {
    const updatedMethods = methods.map((method, i) => {
      if (i === index) {
        if (attribute === "parameters") {
          const paramsArray = value.split(',').map(param => {
            const [name, type] = param.split(':').map(str => str.trim());
            return { name, type };
          }).filter(param => param.name);

          return { ...method, parameters: paramsArray };
        } else {
          return { ...method, [attribute]: value };
        }
      }
      return method;
    });
    setMethods(updatedMethods);
  }, [methods, setMethods]);

  return (
    methods.length !== 0 &&
    <div className="methodsBlock" style={{ marginTop: attributes.length === 0 ? 0 : '-19px', paddingBottom: attributes.length === 0 ? "5px" : '10px' }}>
      {methods.map((method, index) => (
        <div key={index} style={{ display: 'flex', alignItems: "center" }}>
          
          <Properties
            scope={method.scope}
            setScope={(value) => updateMethodAttribute(index, 'scope', value)}
            isStatic={method.isStatic}
            setIsStatic={(value) => updateMethodAttribute(index, 'isStatic', value)}
            isFinal={method.final}
            setIsFinal={(value) => updateMethodAttribute(index, 'final', value)}
            hasSetter={method.hasSetter}
            setHasSetter={(value) => updateMethodAttribute(index, 'setter', value)}
            hasGetter={method.hasGetter}
            setHasGetter={(value) => updateMethodAttribute(index, 'getter', value)}
          />
          
          <Input
            typeName={"method"}
            input={method.name}
            setInput={(newValue) => updateMethodAttribute(index, 'name', newValue)}
            id={index}
            type="method"
          />
          <span>&nbsp;(&nbsp;</span>
          <Parameters
            input={method.parameters.map(param => `${param.name}:${param.type}`).join(', ')}
            setInput={(newValue) => updateMethodAttribute(index, 'parameters', newValue)}
          />
          <span>&nbsp;)&nbsp;</span>
          <span>&nbsp;:&nbsp;</span>
          <Input
            input={method.returnType}
            typeName={"method"}
            setInput={(newValue) => updateMethodAttribute(index, 'returnType', newValue)}
            id={index}
            type="method"
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