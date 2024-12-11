import { useState, useEffect } from "react";

function AttributesBlock(props) {
  

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
      <div style={styles.attributesBlock}>
        {attributes.map((_, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={styles.attribute}>- attribute {index+1} </div>
            {props.isHovered && (<button style={styles.delete} onClick={() => removeAttribute(index)}></button>)}
          </div>
        ))}
      </div>
    )
}
export default AttributesBlock