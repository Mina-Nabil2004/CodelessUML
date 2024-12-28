import { useAppContext } from "../AppContext";
import AttributesBlock from "./Components/AttributeBlock";
import MethodsBlock from "./Components/MethodsBlock";
import NameBlock from "./Components/NameBlock";
import PackageBlock from "./Components/PackageBlock";
import { useState, useCallback, useEffect } from "react";
import classNames from "classnames";
import Dot from "./Dot";

import {
  Handle,
  Position,
} from '@xyflow/react';

function AbstractClassNode({ data, id }) {

  const {
    nodes, setNodes,
    nodeColors,
    updateNodeData
  } = useAppContext();

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [attributes, setAttributes] = useState(data.attributes);
  const [methods, setMethods] = useState(data.methods);

  const addAttribute = () => {
    const newAttribute = {
      type: "type",
      name: "atrribute",
      scope: "public",
      static: false,
      getter: false,
      setter: false,
      final: false,
      abstract: false
    }
    setAttributes([...attributes, newAttribute]);
    updateNodeData(id, 'attributes', attributes);
  };

  const addMethode = () => {
    const newMethod = {
      name: "method",
      returnType: "returnType",
      scope: "public",
      parameters: [{name: "name", type:"type"}],
      static: false,
      final: false,
      abstract: false
    }
    setMethods([...methods, newMethod]);
    updateNodeData(id, 'methods', methods);
  };
  
  useEffect(() => {
    // push in undo stack
    updateNodeData(id, 'attributes', attributes);
    console.log("-----------------------------n----------------------------")
  }, [attributes]);
  
  useEffect(() => {
    // push in undo stack
    updateNodeData(id, 'methods', methods);
  }, [methods]);


  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Dot id={data.id} height={data.height} width={data.width} />
        <PackageBlock packageName={data.package} id={id}/>
      
        
        <NameBlock color={nodeColors.abstractClass} name={data.name} id={id}/>
        
        <AttributesBlock
          data={data}
          id={id}
          attributes={attributes}
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

export default AbstractClassNode;