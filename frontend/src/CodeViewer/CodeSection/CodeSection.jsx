import './CodeSection.css';

import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";

import { packageNodeList } from "../../UIComponents/PackageTree/PackageTree.jsx";

import DownloadIcon from '../../assets/VerticalToolbarIcons/Import.png'
import BackIcon from '../../assets/VerticalToolbarIcons/Undo.png'
import { useAppContext } from "../../AppContext.jsx";
import {useNavigate} from "react-router-dom";

function CodeSection({ codeLines }) {

  const navigate = useNavigate();

  const {
    treeItems,
    getCode,
    focusedItem,
    generatedCodes, setGeneratedCodes,
    projectName
  } = useAppContext();

  const [code, setCode] = useState(codeLines);

  useEffect(() => {
    setCode(codeLines);
  }, [])

  const handleChange = (value) => {
    console.log('Updating file:', focusedItem)
    const updatedGeneratedCodes = [...generatedCodes]
    const index = updatedGeneratedCodes.findIndex((file) => (file.id === focusedItem));
    if (index !== -1) {
      updatedGeneratedCodes[index] = {
        ...updatedGeneratedCodes[index],
        code: value
      }
    }
    setGeneratedCodes(() => updatedGeneratedCodes)
    setCode(value);
    console.log('Updated generated codes:', generatedCodes)
  };

  function handleBackButtonClick() {
    navigate('/');
  }

  useEffect(() => {
    setCode(getCode())
  }, [focusedItem])

  async function handleDownload() {
    console.log(generatedCodes)
    try {
      const response = await fetch('http://localhost:8080/generate/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({projectName: projectName, codeDtos: generatedCodes}),
      });
  
      if (!response.ok) {
        // console.log(response)
        alert("Error: There are multiple files with the same name and path.")
        throw new Error('Network response was not ok');
      }
  
      // Convert response to a blob
      const folder = await response.blob();
  
      // Create a download link
      const url = window.URL.createObjectURL(folder);
      const link = document.createElement('a');
      link.href = url;
  
      // Set the desired file name
      link.setAttribute('download', `${projectName}.zip`);
  
      // Append the link to the body and trigger the download
      document.body.appendChild(link);
      link.click();
  
      // Clean up and remove the link
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error: ', error);
    }
  }
  

  return (
    <div className='code-section-container'>
      <CodeMirror
        className='code-mirror'
        value={code}
        extensions={[java()]}
        onChange={handleChange}
        theme='dark'
        readOnly={!treeItems[focusedItem] || treeItems[focusedItem].isFolder}
      />
      
      <div className='buttons-container'>
        <img
          className='back-icon'
          src={BackIcon}
          alt='Back'
          onClick={handleBackButtonClick}
        />
        <img
          className='download-icon'
          style={{margin: '2px'}}
          src={DownloadIcon}
          alt='Download'
          onClick={handleDownload}
        />
      </div>
    </div>)
}

export default CodeSection;