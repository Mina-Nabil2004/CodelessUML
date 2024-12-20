import { motion } from 'framer-motion';

import Project_Files_Section from "./UMLComponents/Project_Files_Section";
import Code_Section from "./UMLComponents/Code_Section";

function CodeViewer() {
    const projectFilesData = [
        { name: 'Folder 1', files: ['File1.txt', 'File2.txt'] },
        { name: 'Folder 2', files: ['File3.txt', 'File4.txt', 'File5.txt'] },
        { name: 'Folder 3', files: ['File6.txt'] },
    ];

    return (
        <motion.div
            style={{
            display: 'flex', 
            alignItems: 'flex-start', 
            backgroundColor: '#433F70', 
            height: '100vh' // Set height to full viewport height
            }}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <div style={{ marginRight: '40px' }}>
                <Project_Files_Section Project_files={projectFilesData} />
            </div>
            <div style={{ flex: 1 }}>
                <Code_Section />
            </div>
        </motion.div>
    );
}

export default CodeViewer;