import { useCallback } from "react";
import Input from "./Input";
import './UMLStyles.css';
import deleteIcon from '../../assets/DeleteIcon.svg';

function AttributesBlock({ attributes, setAttributes, methods, isHovered, addAttribute }) {

  const removeAttribute = useCallback((indexToRemove) => {
    setAttributes((prevAttributes) => prevAttributes.filter((_, index) => index !== indexToRemove));
  }, [setAttributes]);

  return (
    (attributes.length !== 0 || methods.length ===0) &&
    (<div className="attributesBlock" style={{ paddingBottom: methods.length === 0 ? "10px" : '25px' }}>
      
      {attributes.map((_, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <Input input={`attribute ${index + 1}`} />
          <span>&nbsp;:&nbsp;</span>
          <Input input={"type"}/>
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