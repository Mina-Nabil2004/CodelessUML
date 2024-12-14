const ColorMapper = ({ colors, onChangeFunctions, nodeTypes }) => {
    return (
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          width: '140px',
          height: '100px',
          border: '2px solid #221C32',
          borderRadius: '15px',
          padding: '10px',
          backgroundColor: '#221C32',
        }}>
          {nodeTypes.map((nodeType, index) => (
            <div key={nodeType} style={{ display: 'flex', alignItems: 'center', margin: '2px 0' }}>
              <span style={{ fontSize: '15px', color: '#fff', marginRight: '10px' }}>{nodeType}</span>
              <input
                type="color"
                value={colors[index]}
                onChange={(e) => onChangeFunctions[index](e.target.value)}
                style={{
                  width: '45px',
                  height: '25px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  borderRadius: '50%', // Round the color input
                  position: 'absolute',
                  padding: '0', // Ensure no padding
                  margin: '0', // Remove any margin
                  outline: 'none', // Remove outline
                  boxShadow: 'none', // Remove any default shadow
                  border: '2px solid #221C32', // Add border to the color input
                  marginLeft: '100px',
                  marginRight: '3px', // Fixed distance from the text
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ColorMapper;