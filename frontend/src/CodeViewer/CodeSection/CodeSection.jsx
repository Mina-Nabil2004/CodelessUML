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
    nodes,
    treeItems,
    getCode,
    selectedItems,
    generatedCodes, setGeneratedCodes,
    projectName
  } = useAppContext();

  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(codeLines);
  }, [])

  const handleChange = (value) => {
    setCode(value);
  };

  function handleBackButtonClick() {
    navigate('/');
  }

  useEffect(() => {
    setCode(getCode())
  }, [selectedItems])

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
        alert(response.status)
        throw new Error('Network response was not ok');
      }
  
      // Convert response to a blob
      const folder = await response.blob();
  
      // Create a download link
      const url = window.URL.createObjectURL(folder);
      const link = document.createElement('a');
      link.href = url;

      // const link = document.createElement('a');
      // link.href = URL.createObjectURL(blob);
      // link.download = 'data.xml';
      // link.click();
  
      // Set the desired file name
      link.setAttribute('download', 'GeneratedFiles.zip');
  
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