import './Sidebar.css'

import { useState } from 'react';

import OpenArrowIcon from '../../assets/SidebarIcons/OpenArrow.png'
import CloseArrowIcon from '../../assets/SidebarIcons/CloseArrow.png'



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container'>
      <div
        className='sidebar'
        style={{
          width: isOpen ? '135px' : '0',
          padding: isOpen ? '10px' : '0',
        }}
      >
        {isOpen && (
          <div className='sidebar-content'>
            <h3>Sidebar Content</h3>
            <p>This is the sidebar content.</p>
          </div>
        )}
      </div>
      <div className='sidebar-handle-container'>
        <button className='sidebar-handle' onClick={toggleSidebar}>
         <img className='arrow-icon'
          src={isOpen ? OpenArrowIcon : CloseArrowIcon}
          alt={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
        />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;