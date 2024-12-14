import'./ColorMapper.css';

const ColorMapper = ({ colors, onChangeFunctions, nodeTypes }) => {
    return (
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontFamily: 'segoe ui',
          width: '140px',
          height: '95px',
          border: '2px solid #221C32',
          borderRadius: '15px',
          padding: '10px',
          backgroundColor: '#221C32',
        }}>
          {nodeTypes.map((nodeType, index) => (
            <div key={nodeType} style={{ display: 'flex', alignItems: 'center', margin: '2px 0' }}>
              <span style={{ fontSize: '15px', color: '#fff', marginRight: '10px' }}>{nodeType}</span>
              <input
                id='color-input'
                type="color"
                value={colors[index]}
                onChange={(e) => onChangeFunctions[index](e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ColorMapper;