import { useCallback } from "react";
import Input from "./Input";
import './UMLStyles.css';
import deleteIcon from '../../assets/DeleteIcon.svg';
import Properties from "./Properties";
import Parameters from "./Parameters";
import { useAppContext } from "../../AppContext";

function MethodsBlock({ methods, setMethods, attributes, isHovered, setIsHovered, addMethode, updateNodeData  }) {
  const { nodes, edges, nodeColors, Take_Action } = useAppContext();

  const removeMethod = useCallback((indexToRemove) => {
    Take_Action(nodes, edges, nodeColors); // Capture state before removal
    setMethods((prevMethods) => prevMethods.filter((_, index) => index !== indexToRemove));
  }, [setMethods, nodes, edges, nodeColors, Take_Action]);

  const updateMethodAttribute = useCallback((index, attribute, value) => {
    const updatedMethods = methods.map((method, i) => {
      if (i === index) {
        if (attribute === "parameters") {
          const paramsArray = value.split(',').map(param => {
            const [name, type] = param.split(':').map(str => str.trim());
            return { name, type };
          }).filter(param => param.name || param.type);

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
            isStatic={method.static}
            setIsStatic={(value) => updateMethodAttribute(index, 'static', value)}
            isFinal={method.final}
            setIsFinal={(value) => updateMethodAttribute(index, 'final', value)}
            isAbstract={method.abstract}
            setIsAbstract={(value) => updateMethodAttribute(index, 'abstract', value)}
            method = {true}
          />
          
          <Input
            typeName={"method"}
            input={method.name}
            setInput={(newValue) => updateMethodAttribute(index, 'name', newValue)}
            id={index}
            type="method"
          />
          <span>(</span>
          <Parameters
            input={method.parameters.map(param => `${param.name}:${param.type}`).join(', ')}
            setInput={(newValue) => updateMethodAttribute(index, 'parameters', newValue)}
          />
          <span>)</span>
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
  // );
}

export default MethodsBlock;