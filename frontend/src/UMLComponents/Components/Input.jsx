import React, { useState } from 'react';

const Input = ({ input, setInput }) => {
  const [name, setName] = useState(`${input}`);

  const handleNameChange = (e) => {
    setName(e.target.value);
    // input = e.target.value;
    onInputChange(e.target.value)
    console.log(input)
    handleInput(e.target.value)
  };

  return (
    <div className="attribute">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="input"
        style={{ width: `${name.length}ch` , fontFamily: "Inter, sans-serif"}}
      />
    </div>
  );
};

export default Input;