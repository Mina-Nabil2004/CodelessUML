import React, { useState } from 'react';
import { useAppContext } from '../../AppContext';

const Input = ({ input, id, type }) => {

  const {
    updateNodeData
  } = useAppContext();

  const [name, setName] = useState(`${input}`);

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(name.length);
    updateNodeData(id, type, e.target.value);
  };

  return (
    <div className="input">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        // onChange={handle}
        className="input"
        style={{ width: `${name.length}ch` , fontFamily: "Roboto mono, monospace"}}
      />
    </div>
  );
};

export default Input;