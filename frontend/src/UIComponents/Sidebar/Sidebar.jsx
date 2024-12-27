import './Sidebar.css'

import { useState } from 'react';

import OpenArrowIcon from '../../assets/SidebarIcons/OpenArrow.png'
import CloseArrowIcon from '../../assets/SidebarIcons/CloseArrow.png'
import PackageTree from "../PackageTree/PackageTree.jsx";



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container'>
      <div
          className={'sidebar'}
          style={{
            maxWidth: isOpen ? '100vh' : 0,
            padding: isOpen ? '20px 5px': 0
          }}
      >
        {
          isOpen &&
          <div className='sidebar-content'>
            <PackageTree/>
          </div>
        }
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