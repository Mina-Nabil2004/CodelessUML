import { useState, useEffect } from "react";
import './UMLStyles.css'

function AttributesBlock(props) {

  const styles = {
    attributesBlock: {
      height: `${props.attributesHeight}px`,
      width: `250px`,
    },

    attribute: {
      width: `250px`,
    },
  };
  

  const [attributes, setAttributes] = useState(Array.from({ length: props.attributesNo }, (_, index) => index));

  useEffect(() => {
    setAttributes(Array.from({ length: props.attributesNo }, (_, index) => index));
  }, [props.attributesNo]);

  const removeAttribute = (indexToRemove) => {
    props.setAttributesNo(props.attributesNo-1);
    props.setAttributesHeight(props.attributesHeight - 30);
    setAttributes((prevAttributes) => prevAttributes.filter((_, index) => index !== indexToRemove));
  }
  
  return (
      <div className="attributesBlock" style={styles.attributesBlock}>
        {attributes.map((_, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <div className="attribute" style={styles.attribute}>- attribute {index+1} </div>
            {props.isHovered && (<button className="delete" onClick={() => removeAttribute(index)}></button>)}
          </div>
        ))}
      </div>
    )
}
export default AttributesBlock