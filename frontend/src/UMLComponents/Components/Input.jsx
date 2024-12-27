import React, { useState } from 'react';
import { useAppContext } from '../../AppContext';

const Input = ({ input, setInput, id, type }) => {

  const {
    updateNodeData
  } = useAppContext();

  const handleChange = (e) => {
    console.log(input);
    if(type == "method" || type == "attribute"){
      setInput(e.target.value.replace(/\s+/g, ''));
    }
    updateNodeData(id, type, e.target.value.replace(/\s+/g, ''));
  };

  return (
    <div className="input">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="input"
        style={{ width: `${input.length}ch` , fontFamily: "Roboto mono, monospace"}}
      />
    </div>
  );
};

export default Input;