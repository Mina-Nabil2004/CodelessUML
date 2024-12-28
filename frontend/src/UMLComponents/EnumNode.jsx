import { useAppContext } from "../AppContext";
import ValuesBlock from "./Components/ValuesBlock";
import NameBlock from "./Components/NameBlock";
import PackageBlock from "./Components/PackageBlock";
import { useState, useCallback, useEffect } from "react";
import Dot from "./Dot";

import {
  Handle,
  Position,
} from '@xyflow/react';

function EnumNode({ data, id }) {

  const {
    nodes, setNodes,
    nodeColors,
    updateNodeData,
    edges, setEdges,
    treeItems, setTreeItems,
    takeAction
  } = useAppContext();

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [attributes, setAttributes] = useState(data.attributes);

  const addAttribute = () => {
    const newAttribute = {
      value: "value",
    }
    takeAction();
    setAttributes([...attributes, newAttribute]);
    updateNodeData(id, 'attributes', attributes);
  };
  
  useEffect(() => {
    if (data.attributes !== attributes) {
      updateNodeData(id, 'attributes', attributes);
      console.log("Attributes updated:", attributes);
    }
  }, [attributes]);
  
  useEffect(() => {
    if (data.attributes !== attributes) {
      setAttributes(data.attributes);
      console.log("Attributes initialized:", data.attributes);
    }
  }, [data]);

  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Dot id={data.id} height={data.height} width={data.width} />
        <PackageBlock packageName={data.package} />
      
        
        <NameBlock color={nodeColors.enum} name={data.name} id={id}/>
        
        <ValuesBlock
          attributes={attributes}
          setAttributes={setAttributes}
          isHovered={isHovered}
        />
        
      </div>
      {isHovered && (
          <button className="attribute-buttons" onClick={addAttribute} onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
               style={{left:"50%"}}>
            + value
          </button>
      )}
    </div>
  );
}

export default EnumNode;