import React, { useState } from 'react';

const Input = ({ typeName, index }) => {
  const [name, setName] = useState(`${typeName} ${index + 1}`);
  const [type, setType] = useState(`type`);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="attribute">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        style={{ border: 'none', outline: 'none', width: 'auto', minWidth: '10px' }}
      />
        :
      <input
        type="text"
        value={type}
        onChange={handleTypeChange}
        style={{ border: 'none', outline: 'none', width: 'auto', minWidth: '10px' }}
      />
    </div>
  );
};

export default Input;