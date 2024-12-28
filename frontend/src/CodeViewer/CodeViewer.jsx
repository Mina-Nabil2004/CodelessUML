import './CodeViewer.css';

import { motion } from 'framer-motion';

import ProjectFilesSection from "./ProjectFilesSection/ProjectFilesSection.jsx";
import CodeSection from "./CodeSection/CodeSection.jsx";
import { useAppContext } from '../AppContext.jsx';

function CodeViewer() {
  const {
    getCode,
  } = useAppContext();
  
  const projectFilesData = [
    { name: 'package_a', files: ['ClassA.java', 'ClassB.java'] },
    { name: 'package_b', files: ['ClassA.java', 'ClassB.java', 'ClassC.java'] },
    { name: 'package_c', files: ['ClassA.java'] },
  ];

  return (
    <motion.div
      className='code-viewer-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ProjectFilesSection projectFiles={projectFilesData} />
      {/* <CodeSection codeLines={"\n".repeat(30)} /> */}
      <CodeSection codeLines={getCode()} />
    </motion.div>
  );
}

export default CodeViewer;