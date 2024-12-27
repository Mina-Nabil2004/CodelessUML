import './ProjectFilesSection.css';

import PackageTree from "../../UIComponents/PackageTree/PackageTree.jsx";

const ProjectFilesSection = ({ projectFiles }) => {
  return (
      <div className='project-files-section-folders'>
        <PackageTree />
      </div>
  );
};

export default ProjectFilesSection;