import './Folder.css';

import { useState } from 'react';

import DroppingArrowIcon from '../../../assets/CodeViewerIcons/DroppingArrowIcon.png'
import CollapsingArrowIcon from '../../../assets/CodeViewerIcons/CollapsingArrowIcon.png'
import JavaIcon from '../../../assets/CodeViewerIcons/JavaIcon.svg'

function Folder({ folderName, files }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
  }

  return (
      <div onDoubleClick={handleDoubleClick}>
        <div
           className='project-files-section-folder'
           onClick={toggleDropdown}
        >
          <img
            className='project-files-section-arrow'
            src={isOpen ? CollapsingArrowIcon : DroppingArrowIcon}
            alt={isOpen ? 'Show Files' : 'Hide Files'}
          />
          <span style={{ color: '#FFF' }}>{folderName}</span> {/* Changed text color for contrast */}
        </div>
        <div className={`project-files-section-files ${isOpen? 'open' : ''}`}>
          {files.map((file, index) => (
              <div className='project-files-section-file' key={index}>
                <img
                    src={JavaIcon}
                    alt='Java Icon'
                />
                <span>{file}</span>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Folder;