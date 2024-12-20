import { useState, useEffect } from "react";
import Input from "./Input";
import './UMLStyles.css'
import deleteIcon from '../../assets/DeleteIcon.svg'

function AttributesBlock(props) {
  const [attributes, setAttributes] = useState(Array.from({ length: props.attributesNo }, (_, index) => index));

  useEffect(() => {
    setAttributes(Array.from({ length: props.attributesNo }, (_, index) => index));
  }, [props.attributesNo]);

  const removeAttribute = (indexToRemove) => {
    props.setAttributesNo(props.attributesNo-1);
    props.setAttributesHeight(props.attributesHeight - 30);
    setAttributes((prevAttributes) => prevAttributes.filter((_, index) => index !== indexToRemove));4
  }
  
  return (
      <div className="attributesBlock">
        {
          attributes.map((_, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              
              <div className="attribute">
                <Input typeName={"attribute"} index={index}/>
              </div>
              {
                props.isHovered && (
                  <img className="delete" onClick={() => removeAttribute(index)} src={deleteIcon}/>
                )
              }
            </div>
          ))
        }
      </div>
    )
}
export default AttributesBlock