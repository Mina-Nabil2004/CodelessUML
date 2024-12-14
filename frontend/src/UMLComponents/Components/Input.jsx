import React, { useState, useRef, useEffect } from 'react';

const Input = ({ type, index }) => {
  const [name, setName] = useState(`attribute ${index + 1}`);
  const [returnType, setReturnType] = useState(`return`);
  const inputRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleReturnChange = (e) => {
    setReturnType(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
    }
  }, [name, returnType]);

  return (
    <div className="attribute">
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={handleNameChange}
        style={{ border: 'none', outline: 'none', width: 'auto' }}
      />
      :
      <input
        ref={inputRef}
        type="text"
        value={returnType}
        onChange={handleReturnChange}
        style={{ border: 'none', outline: 'none', width: 'auto' }}
      />
    </div>
  );
};

export default Input;