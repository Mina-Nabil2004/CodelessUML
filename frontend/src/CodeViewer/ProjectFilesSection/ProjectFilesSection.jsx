import './ProjectFilesSection.css';

import Folder from './Folder/Folder.jsx';

const ProjectFilesSection = ({ projectFiles }) => {
  return (
      <div className='project-files-section-folders'>
        {projectFiles.map((project_file, index) => (
            <Folder key={index} folderName={project_file.name} files={project_file.files}/>
        ))}
      </div>
  );
};

export default ProjectFilesSection;