import React, { useState } from 'react';

const Properties = () => {
  const [scope, setScope] = useState('public');
  const [isStatic, setIsStatic] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [hasSetter, setHasSetter] = useState(false);
  const [hasGetter, setHasGetter] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleScopeChange = (e) => {
    setScope(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="attribute-scope-container">
      <div className="dropdown" onClick={toggleDropdown}>
        <div className="dropdown-selected">
          {scope === 'public' && '+'}
          {scope === 'private' && '-'}
          {scope === 'protected' && '~'}
          {scope === 'package' && '#'}
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <select
              className="attribute-scope"
              value={scope}
              onChange={handleScopeChange}
            >
              <option value="public">+</option>
              <option value="private">-</option>
              <option value="protected">~</option>
              <option value="package">#</option>
            </select>

            <div className="radio-buttons">
              <label>
                <input
                  type="checkbox"
                  checked={isStatic}
                  onChange={() => setIsStatic(!isStatic)}
                />
                Static
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={isFinal}
                  onChange={() => setIsFinal(!isFinal)}
                />
                Final
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={hasSetter}
                  onChange={() => setHasSetter(!hasSetter)}
                />
                Setter
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={hasGetter}
                  onChange={() => setHasGetter(!hasGetter)}
                />
                Getter
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;