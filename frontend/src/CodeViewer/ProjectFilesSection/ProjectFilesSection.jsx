import './ProjectFilesSection.css';

import PackageTree from "../../UIComponents/PackageTree/PackageTree.jsx";

const ProjectFilesSection = () => {
  return (
      <div className='project-files-section-folders'>
        <PackageTree canRename={false} canDragAndDrop={false}/>
      </div>
  );
};

export default ProjectFilesSection;