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

function ClassNode({ data, id }) {

  const {
    nodes, setNodes,
    nodeColors,
    updateNodeData,
    edges, setEdges,
    treeItems, takeAction
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
      isStatic: false,
      getter: false,
      setter: false,
      final: false
    }
    takeAction();
    setAttributes([...attributes, newAttribute]);
    updateNodeData(id, 'attributes', attributes);
  };

  const addMethode = () => {
    const newMethod = {
      name: "method",
      returnType: "returnType",
      scope: "public",
      parameters: [{name: "name", type:"type"}],
      isStatic: false,
      final: false
    }
    takeAction();
    setMethods([...methods, newMethod]);
    updateNodeData(id, 'methods', methods);
  };
  
  useEffect(() => {
    if (data.attributes !== attributes) {
      updateNodeData(id, 'attributes', attributes);
      console.log("Attributes updated:", attributes);
    }
  }, [attributes]);
  
  useEffect(() => {
    if (data.methods !== methods) {
      updateNodeData(id, 'methods', methods);
      console.log("Methods updated:", methods);
    }
  }, [methods]);

  useEffect(() => {
    if (data.attributes !== attributes) {
      setAttributes(data.attributes);
      console.log("Attributes initialized:", data.attributes);
    }
    if (data.methods !== methods) {
      setMethods(data.methods);
      console.log("Methods initialized:", data.methods);
    }
  }, [data]);


  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Dot id={data.id} height={data.height} width={data.width} />
        <PackageBlock packageName={data.package}/>
      
        
        <NameBlock color={nodeColors.class} name={data.name} id={id}/>
        
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

export default ClassNode;