import './CodeViewer.css';

import { motion } from 'framer-motion';

import ProjectFilesSection from "./ProjectFilesSection/ProjectFilesSection.jsx";
import CodeSection from "./CodeSection/CodeSection.jsx";
import { useAppContext } from '../AppContext.jsx';

function CodeViewer() {
  const {
    getCode,
  } = useAppContext();

  return (
    <motion.div
      className='code-viewer-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ProjectFilesSection />
      <CodeSection codeLines={getCode()} />
    </motion.div>
  );
}

export default CodeViewer;