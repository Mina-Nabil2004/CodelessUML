import { useCallback } from "react";
import Input from "./Input";
import './UMLStyles.css';
import deleteIcon from '../../assets/DeleteIcon.svg';
import Properties from "./Properties";
import { useAppContext } from "../../AppContext";
function AttributesBlock({ attributes, setAttributes, methods, isHovered, addAttribute, id }) {
  const { nodes, edges, nodeColors, takeAction } = useAppContext();
  const removeAttribute = useCallback((indexToRemove) => {
    takeAction(nodes, edges, nodeColors);
    setAttributes((prevAttributes) => prevAttributes.filter((_, index) => index !== indexToRemove));
  }, [setAttributes, nodes, edges, nodeColors, takeAction]);


  const updateAttribute = useCallback((index, type, value) => {
    const updatedAttribute = attributes.map((attribute, i) => {
      if (i === index) {
        return { ...attribute, [type]: value };
      }
      return attribute;
    });
    setAttributes(updatedAttribute);
  }, [attributes, setAttributes]);

  return (
    (attributes.length !== 0 || methods.length ===0) &&
    (<div className="attributesBlock" style={{ paddingBottom: methods.length === 0 ? "10px" : '25px' }}>
      
      {attributes.map((attribute, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>

          <Properties
            scope={attribute.scope}
            setScope={(value) => updateAttribute(index, 'scope', value)}
            isStatic={attribute.static}
            setIsStatic={(value) => updateAttribute(index, 'static', value)}
            isFinal={attribute.final}
            setIsFinal={(value) => updateAttribute(index, 'final', value)}
            hasSetter={attribute.hasSetter}
            setHasSetter={(value) => updateAttribute(index, 'setter', value)}
            hasGetter={attribute.hasGetter}
            setHasGetter={(value) => updateAttribute(index, 'getter', value)}
            isAbstract={attribute.abstract}
            setIsAbstract={(value) => updateAttribute(index, 'abstract', value)}
            method={false}
          />  

          <Input
            typeName={"attribute"}
            input={attribute.name}
            setInput={(newValue) => updateAttribute(index, 'name', newValue)}
            id={index}
            type="attribute"
          />
          
          <span>&nbsp;:&nbsp;</span>
          
          <Input
            input={attribute.type}
            typeName={"attribute"}
            setInput={(newValue) => updateAttribute(index, 'type', newValue)}
            id={index}
            type="attribute"
          />
          
          {isHovered && (
            <img
              className="delete"
              onClick={() => removeAttribute(index)}
              src={deleteIcon}
              alt="Delete"
            />
          )}
        </div>
      ))}

      {isHovered && attributes.length > 0 && methods.length > 0 && (
        <button className="attribute-button" onClick={addAttribute} >
          + attribute
        </button>
      )}
      
    </div>)
  );
}

export default AttributesBlock;