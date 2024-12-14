import React, { useState } from 'react';

const openImage = 'https://cdn.discordapp.com/attachments/1304446492517597224/1317264155450806309/image.png?ex=675e0d58&is=675cbbd8&hm=0c02e3ca6f1d468f6c020e93d757d2188d5b3ae563c98942e00e0cb39d2ed94e&'; // Replace with your open image URL
const closeImage = 'https://cdn.discordapp.com/attachments/1304446492517597224/1317264251949289512/image.png?ex=675e0d6f&is=675cbbef&hm=d4fef53c8305a75300a2edd3bc6dd6f8d2e1657fbff507055e5cc8dfa97b6448&'; // Replace with your close image URL

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        width: isOpen ? '147.71px' : '0',
        transition: 'width 0.3s',
        overflow: 'hidden',
        backgroundColor: '#221C32',
        borderRight: '2px solid #ccc',
        padding: isOpen ? '10px' : '0',
        position: 'relative',
        height: '313px'
      }}>
        {isOpen && (
          <div>
            <h3>Sidebar Content</h3>
            <p>This is the sidebar content.</p>
          </div>
        )}
      </div>
      <div style={{ flexGrow: 1, padding: '10px', position: 'relative' }}>
        <button onClick={toggleSidebar} style={{
          fontSize: '12px',
          backgroundColor: '#221C32',
          border: 'none',
          cursor: 'pointer',
          position: 'absolute',
          left: '0px', // Adjust this value to connect the button
          top: '50%', // Center vertically
          transform: 'translateY(-50%)', // Center vertically
          borderRadius: '0 15px 15px 0', // Rounded border only on the right side
          padding: '10px 15px',
          color: 'white',
          outline: 'none',
          boxShadow: 'none',
          height: '333px'
        }}>
         <img
          src={isOpen ? closeImage : openImage}
          alt={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
          style={{
            width: '10px', // Adjust size as needed
            height: '20px', // Adjust size as needed
          }}
        />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;