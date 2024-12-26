import React, { useState } from 'react';
import { useAppContext } from '../../AppContext';

const Input = ({ input, id, type }) => {

  const {
    updateNodeData
  } = useAppContext();

  const handleChange = (e) => {
    console.log(input);
    updateNodeData(id, type, e.target.value);
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