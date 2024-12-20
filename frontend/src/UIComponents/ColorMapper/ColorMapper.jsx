import { useEffect } from 'react';
import './ColorMapper.css';
import { useAppContext } from '../../AppContext.jsx';

const ColorMapper = ({ onChangeFunctions, nodeTypes }) => {
  
  const {
    nodeColors, setNodeColors
  } = useAppContext();

  const colors = [nodeColors.class, nodeColors.abstractClass, nodeColors.interface, nodeColors.enum];

  return (
    <div className='color-mapper-container'>
      {nodeTypes.map((nodeType, index) => (
        <div className='color-mapper-row' key={nodeType}>
          <span className='node-type'>
            {nodeType}
          </span>
          
          <input
            className='color-input'
            type="color"
            value={colors[index]}
            onChange={(e) => onChangeFunctions[index](e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default ColorMapper;



