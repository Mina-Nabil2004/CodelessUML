import './CodeSection.css';

import DownloadIcon from '../../assets/VerticalToolbarIcons/Import.png'
import BackIcon from '../../assets/VerticalToolbarIcons/Undo.png'

const CodeSection = (codeLines) => {

    const totalLines = 27; // Total number of lines to display

  function handleBackButtonClick() {
    window.location.href = `${window.location.origin}`
  }

  return (
      <div className='code-section-container'>
        <div className='buttons-container'>
          <img
            className='back-icon'
            src={BackIcon}
            alt='Back'
            onClick={handleBackButtonClick}
          />
          <img
            className='download-icon'
            src={DownloadIcon}
            alt='Download'
          />
        </div>
      </div>
  );
};

export default CodeSection;
    