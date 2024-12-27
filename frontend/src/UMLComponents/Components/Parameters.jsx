import React from 'react';

const Parameters = ({ input, setInput }) => {

  const handleChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '');

    if (value.endsWith(',')) {
      value += 'name:type';
    }

    const params = value.split(',').map(param => param.trim());
    const updatedParams = params.filter(param => param.includes(':')).join(', ');

    setInput(updatedParams);
  };

  return (
    <div className="input">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="input"
        style={{ width: `${input.length}ch`, fontFamily: "Roboto mono, monospace" }}
      />
    </div>
  );
};

export default Parameters;