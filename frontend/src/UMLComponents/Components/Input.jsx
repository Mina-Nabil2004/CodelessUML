import React, { useState } from 'react';

const Input = ({ input }) => {
  const [name, setName] = useState(`${input}`);

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(name.length);
  };

  return (
    <div className="input">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="input"
        style={{ width: `${name.length}ch` , fontFamily: "Roboto mono, monospace"}}
      />
    </div>
  );
};

export default Input;