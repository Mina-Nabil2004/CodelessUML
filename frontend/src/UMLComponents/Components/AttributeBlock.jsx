import { useState, useEffect } from "react";
import './UMLStyles.css'
import deleteIcon from '../../assets/deleteIcon.svg'

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
      <div className="attributesBlock">
        {
          attributes.map((_, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              
              <div className="attribute">
                - attribute {index+1} 
              </div>
              {
                props.isHovered && (
                  <img className="delete" onClick={() => removeMethod(index)} src={deleteIcon}/>
                )
              }
            </div>
          ))
        }
      </div>
    )
}
export default AttributesBlock