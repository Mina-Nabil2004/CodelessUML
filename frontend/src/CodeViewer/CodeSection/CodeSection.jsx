import './CodeSection.css';

import {useEffect, useState} from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";

import {packageNodeList} from "../../UIComponents/PackageTree/PackageTree.jsx";

import DownloadIcon from '../../assets/VerticalToolbarIcons/Import.png'
import BackIcon from '../../assets/VerticalToolbarIcons/Undo.png'
import {useAppContext} from "../../AppContext.jsx";

function CodeSection({ codeLines }){

  const {
    nodes,
    treeItems,
  } = useAppContext();

  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(codeLines);
  }, [])

  const handleChange = (value) => {
    setCode(value);
  };

  function handleBackButtonClick() {
    window.location.href = `${window.location.origin}`
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
              src={DownloadIcon}
              alt='Download'
              onClick={() => console.log(packageNodeList(nodes, treeItems))}
          />
        </div>
      </div>)
}

export default CodeSection;