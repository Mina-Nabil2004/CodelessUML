import { useState, useEffect } from "react";

function AttributesBlock(props) {
  const styles = {
    attributesBlock: {
      marginTop: "-3px",
      height: `${props.attributesHeight}px`,
      padding: "5px",
      paddingBottom: "17px",
      backgroundColor: "white",
      border: "solid black",
      borderRadius: "0px 0px 20px 20px",
      width: `${props.width}px`,
    },

    attribute: {
      width: `${props.width}px`,
      fontSize: "20px",
    },

    delete:{
      marginRight: "-20px",
      width: "10px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "black",
      color: "white",
      fontSize: "10px",
    }
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