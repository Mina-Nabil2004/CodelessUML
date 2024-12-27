import './CustomTreeItem.css'
import PropTypes from "prop-types";
import IconButton from "../../IconButton/IconButton.jsx";

function CustomTreeItem({ title, item,
                          addFolderIcon, handleAddFolder,
                          handleDelete, deleteIcon}) {
  return (
      <div className='tree-item-container'>
        {title}
      <div className='tree-item-icons'>
        {item.isFolder && (<IconButton
            src={addFolderIcon}
            onClick={handleAddFolder}
        />)}
        <IconButton src={deleteIcon} onClick={handleDelete} />
      </div>
      </div>
  )
}

export default CustomTreeItem;

CustomTreeItem.propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  addFolderIcon: PropTypes.string.isRequired,
  handleAddFolder: PropTypes.func.isRequired,
  deleteIcon: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
}