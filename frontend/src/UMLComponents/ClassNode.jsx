import { useAppContext } from "../AppContext";
import AttributesBlock from "./Components/AttributeBlock";
import MethodsBlock from "./Components/MethodsBlock";
import NameBlock from "./Components/NameBlock";
import PackageBlock from "./Components/PackageBlock";
import { useState, useCallback } from "react";
import classNames from "classnames";
import Dot from "./Dot";

import {
  Handle,
  Position,
} from '@xyflow/react';

function ClassNode({ data, id }) {

  const {
    nodes, setNodes,
    nodeColors,
    updateNodeData
  } = useAppContext();

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [methods, setMethods] = useState([]);

  const addAttribute = () => {
    // data.name = "ahmed";
    // console.log(newAttributes);
    setAttributes([...attributes, `Attribute ${attributes.length + 1}`]);
    updateNodeData(id, 'attributes', attributes);
  };

  const addMethode = () => {
    setMethods([...methods, `Method ${methods.length + 1}`]);
  };


  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Dot id={data.id} height={data.height} width={data.width} />
        <PackageBlock packageName={data.package} id={id}/>
      
        
        <NameBlock color={nodeColors.class} name={data.name} id={id}/>
        
        <AttributesBlock
          data={data}
          id={id}
          attributes={data.attributes}
          setAttributes={setAttributes}
          methods={methods}
          isHovered={isHovered}
          addAttribute={addAttribute}
        />
        <MethodsBlock
          data={data}
          methods={methods}
          setMethods={setMethods}
          attributes={attributes}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          addMethode={addMethode}
        />
      </div>
      {isHovered && (attributes.length === 0 || methods.length === 0) && (
          <button className="attribute-buttons" onClick={addAttribute} onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
               style={{left:"33%"}}>
            + attribute
          </button>
      )}
      {isHovered && (attributes.length === 0 || methods.length === 0) && (
          <button className="method-buttons" onClick={addMethode} onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
               style={{right:"33%"}}>
            + method
          </button>
      )}

    </div>
  );
}

export default ClassNode;