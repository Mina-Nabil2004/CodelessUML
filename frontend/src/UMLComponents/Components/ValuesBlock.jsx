import { useCallback } from "react";
import Input from "./Input";
import './UMLStyles.css';
import deleteIcon from '../../assets/DeleteIcon.svg';
import Properties from "./Properties";

function ValuesBlock({ attributes, setAttributes, isHovered }) {

  const removeAttribute = useCallback((indexToRemove) => {
    setAttributes((prevAttributes) => prevAttributes.filter((_, index) => index !== indexToRemove));
  }, [setAttributes]);

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
    (<div className="attributesBlock" style={{ paddingBottom:"10px" }}>
      
      {attributes.map((attribute, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>

          <Input
            typeName={"attribute"}
            input={attribute.value}
            setInput={(newValue) => updateAttribute(index, 'value', newValue)}
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
    </div>)
  );
}

export default ValuesBlock;