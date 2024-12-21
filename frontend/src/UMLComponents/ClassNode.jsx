import { useAppContext } from "../AppContext";
import AttributesBlock from "./Components/AttributeBlock";
import MethodsBlock from "./Components/MethodsBlock";
import NameBlock from "./Components/NameBlock";
import PackageBlock from "./Components/PackageBlock";
import { useState, useCallback } from "react"
import classNames from"classnames"
import Dot from "./Dot";

import {
   Handle,
   Position,
} from '@xyflow/react';

function ClassNode({ data }) {

   const onChange = useCallback((evt) => {
      console.log(evt.target.value);
   }, []);

   const {
      nodeColors
   } = useAppContext();

   //const [methodesHeight, setMethodesHeight] = useState(30);
   // const [attributesHeight, setAttributesHeight] = useState(30);
   // const [methodesNo, setMethodesNo] = useState(0);
   // const [attributesNo, setAttributesNo] = useState(0);
   const [isHovered, setIsHovered] = useState(false);
   const [attributes, setAttributes] = useState(data.attributes);
   const [methods, setMethods] = useState(data.methods);

   const addAttribute = () => {
      // setAttributesNo(attributesNo + 1);
      setAttributes([...attributes, attributes.length])
      // console.log(attributes);
      
   };

   const addMethode = () => {
      setMethods(...methods, methodes.length);
   };

   return (
      <div>
         
         <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            
            <PackageBlock packageName={data.package} width={data.width}/>
            <Dot id={data.id} />
            
            <NameBlock color={nodeColors.class} width={data.width} type={data.type} name={data.name}/>
            
            {/* <AttributesBlock data={data} attributesHeight={attributesHeight} setAttributesHeight={setAttributesHeight} 
            isHovered={isHovered} setAttributesNo={setAttributesNo} attributesNo={attributesNo} width={data.width}/> */}
            <AttributesBlock data={data} attributes={attributes} setAttributes={setAttributes} />

            <MethodsBlock data={data} isHovered={isHovered} 
            setMethodesNo={setMethodesNo} methodesNo={methodesNo} width={data.width}/>
         
         </div>
         
         <div
            className={classNames('buttons', { 'buttonsVisible': isHovered })}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            
            <button className="button" onClick={addAttribute}>+ attribute</button>
            <button className="button" onClick={addMethode}>+ method</button>
         </div>

      </div>
   )
  }
  
  export default ClassNode