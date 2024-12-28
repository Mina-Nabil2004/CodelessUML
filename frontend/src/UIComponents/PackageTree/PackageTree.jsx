import './PackageTree.css'

import { useAppContext } from "../../AppContext.jsx";
import { ControlledTreeEnvironment, Tree } from 'react-complex-tree';
import CustomTreeItem from "./CustomTreeItem/CustomTreeItem.jsx";

import AddFolderIcon from '../../assets/PackageTree/AddFolderIcon.png'
import DeleteIcon from '../../assets/PackageTree/DeleteIcon.png'


export function packageNodeList(nodes, treeItems) {
  let packagedNodes = [...nodes]
  let packageNames = []

  // Loop over tree nodes
  for (const treeItemKey in treeItems) {
    const treeItem = treeItems[treeItemKey]

    // Find leaf nodes (a UML node)
    if (!treeItem.isFolder) {
      let currentTreeItem = treeItems[treeItem.parentId]
      let fullPackageName = ''

      console.log(currentTreeItem)

      // Traverse to root and append package names
      while (currentTreeItem.index !== 'root') {
        fullPackageName = `${fullPackageName !== '' ? '.' : ''}` + fullPackageName
        fullPackageName = currentTreeItem.data + fullPackageName
        currentTreeItem = treeItems[currentTreeItem.parentId]
      }

      packageNames.push({ nodeId: treeItem.index, packageName: fullPackageName })
    }
  }

  // Add package attribute to UML nodes
  nodes.forEach((node) => {
    console.log('UML node: ', node)
    let newNode = {
      ...node, data: {
        ...node.data,
        package: packageNames[node.id]
      }
    }
    console.log('Mapped UML node:', newNode)
    packagedNodes.push(newNode)
  })

  return packagedNodes
}


function PackageTree() {

  const {
    updateNode,
    deleteNode,
    focusedItem, setFocusedItem,
    expandedItems, setExpandedItems,
    selectedItems, setSelectedItems,
    treeItems, setTreeItems
  } = useAppContext()

  const handleAddPackage = (e, item) => {
    console.log('Adding package...')
    e.stopPropagation();

    const itemIndex = item.index

    const newFolderId = `package-${Date.now()}`;
    const newFolder = {
      index: newFolderId,
      isFolder: true,
      children: [],
      data: 'new_package',
      canRename: true,
      parentId: itemIndex,
    };

    const updatedTreeItems = { ...treeItems };
    updatedTreeItems[newFolderId] = newFolder;
    updatedTreeItems[itemIndex] = {
      ...updatedTreeItems[itemIndex],
      children: [...updatedTreeItems[itemIndex].children, newFolderId],
    };

    setTreeItems(updatedTreeItems);
  };


  const handleDelete = (item) => {
    deleteNode(item.index)
  }

  const handleOnDrop = (items, target) => {
    items.forEach(item => {
      updateNode(item.index, 'package', target.targetItem)
    })
  };

  const handleOnRename = (item, name) => {
    updateNode(item.index, 'name', name)
  };

  const renderCustomTreeItem = (title, item) => {
    return (
      <CustomTreeItem
        title={title}
        item={item}
        addFolderIcon={AddFolderIcon}
        handleAddFolder={(e) => handleAddPackage(e, item)}
        deleteIcon={DeleteIcon}
        handleDelete={(e) => {
          e.stopPropagation()
          handleDelete(item)
        }}
      />
    )
  }


  return (
    <ControlledTreeEnvironment
      items={treeItems}
      getItemTitle={(item) => item.data}
      viewState={{
        ['tree-1']: {
          focusedItem,
          expandedItems,
          selectedItems,
        },
      }}
      canDragAndDrop={true}
      canDropOnFolder={true}
      canReorderItems={false}
      canRename={true}
      onRenameItem={(item, name) => handleOnRename(item, name)}
      onFocusItem={(item) => setFocusedItem(item.index)}
      onExpandItem={(item) => setExpandedItems([...expandedItems, item.index])}
      onCollapseItem={(item) =>
        setExpandedItems(expandedItems.filter((expandedItemIndex) => expandedItemIndex !== item.index))
      }
      onSelectItems={(items) => setSelectedItems(() => items)}
      onDrop={(items, target) => handleOnDrop(items, target)}
      renderItemTitle={({ title, item }) => renderCustomTreeItem(title, item)}
    >
      <Tree treeId="tree-1" rootItem="virtualRoot" treeLabel="Tree Example" />
    </ControlledTreeEnvironment>
  );
}

export default PackageTree;