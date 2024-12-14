import React, { useState } from 'react';

const dropping_arrow = 'https://cdn.discordapp.com/attachments/1304446492517597224/1317343475850674237/Vector.png?ex=675e5737&is=675d05b7&hm=1b48b1a74778d397991e04e37679682c915687f93396d35cce79f463c779605e&';
const Collecting_arrow = 'https://cdn.discordapp.com/attachments/1304446492517597224/1317264155450806309/image.png?ex=675e0d58&is=675cbbd8&hm=0c02e3ca6f1d468f6c020e93d757d2188d5b3ae563c98942e00e0cb39d2ed94e&';

const Folder = ({ folderName, files }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={toggleDropdown}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '10px',
          border: '1px solid #2F2746',
          borderRadius: '5px',
          backgroundColor: '#2F2746',
          marginBottom: '5px',
        }}
      >
        <img
          src={isOpen ? dropping_arrow : Collecting_arrow}
          alt={isOpen ? 'Show Files' : 'Hide Files'}
          style={{
            width: '9px',  // Increased size for better visibility
            height: '9px', // Increased size for better visibility
            marginRight: '10px', // Added margin for spacing
          }}
        />
        <span style={{ color: '#FFF' }}>{folderName}</span> {/* Changed text color for contrast */}
      </div>
      {isOpen && (
        <div style={{
          paddingLeft: '20px', // Indent dropdown content
          border: '1px solid #2F2746',
          borderRadius: '5px',
          backgroundColor: '#2F2746',
          marginBottom: '5px'
        }}>
          {files.map((file, index) => (
            <div key={index} style={{ padding: '5px 0', marginLeft: '20px', color: '#FFF' }}>
              {file}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Project Files Section Component
const Project_Files_Section = ({ Project_files }) => {
  return (
    <div>
      <div style={{
        display: 'flex',
        marginTop: '22px',
        marginLeft: '22px',
        backgroundColor: '#2F2746',
        width: '266px',
        height: '550px',
        border: '1.5px solid #2F7784',
        borderRadius: '15px',
        overflowY: 'auto' // Add scrolling if necessary
      }}>
        <div style={{ width: '100%' }}>
          {Project_files.map((project_file, index) => (
            <Folder key={index} folderName={project_file.name} files={project_file.files} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project_Files_Section;