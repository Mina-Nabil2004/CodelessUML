import Project_Files_Section from "./UMLComponents/Project_Files_Section";
import Code_Section from "./UMLComponents/Code_Section";

function CodeViewer() {
    const projectFilesData = [
        { name: 'Folder 1', files: ['File1.txt', 'File2.txt'] },
        { name: 'Folder 2', files: ['File3.txt', 'File4.txt', 'File5.txt'] },
        { name: 'Folder 3', files: ['File6.txt'] },
    ];

    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            backgroundColor: '#433F70', 
            height: '100vh' // Set height to full viewport height
        }}>
            <div style={{ marginRight: '40px' }}>
                <Project_Files_Section Project_files={projectFilesData} />
            </div>
            <div style={{ flex: 1 }}>
                <Code_Section />
            </div>
        </div>
    );
}

export default CodeViewer;