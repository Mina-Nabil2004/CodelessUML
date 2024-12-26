import React from 'react';
import './UMLStyles.css';
import { useState } from 'react';

const Properties = ({ scope, setScope, isStatic, setIsStatic, isFinal, setIsFinal, hasSetter, setHasSetter, hasGetter, setHasGetter }) => {
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
      </div>
      {dropdownOpen && (
        <div className="dropdown-menu">
          <div className="modal-content">
            <span className="close" onClick={toggleDropdown}>&times;</span>
            <div className="radio-buttons" style={{ display: "flex", flexDirection: "column" }}>
              <label>
                <input
                  type="radio"
                  value="public"
                  checked={scope === 'public'}
                  onChange={handleScopeChange}
                />
                + public
              </label>
              <label>
                <input
                  type="radio"
                  value="private"
                  checked={scope === 'private'}
                  onChange={handleScopeChange}
                />
                - private
              </label>
              <label>
                <input
                  type="radio"
                  value="protected"
                  checked={scope === 'protected'}
                  onChange={handleScopeChange}
                />
                ~ protected
              </label>
              <label>
                <input
                  type="radio"
                  value="package"
                  checked={scope === 'package'}
                  onChange={handleScopeChange}
                />
                # package
              </label>
            </div>
            --------------
            <div className="pro" style={{ display: "flex", flexDirection: "column" }}>
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
        </div>
      )}
    </div>
  );
};

export default Properties;