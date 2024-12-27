import 'react-complex-tree/lib/style-modern.css';
import { useAppContext } from "../../AppContext.jsx";
import { ControlledTreeEnvironment, Tree } from 'react-complex-tree';
import { useCallback, useEffect} from 'react';
import CustomTreeItem from "./CustomTreeItem/CustomTreeItem.jsx";

import AddFolderIcon from '../../assets/PackageTree/AddFolderIcon.png'
import DeleteIcon from '../../assets/PackageTree/DeleteIcon.png'


export function packageNodeList (nodes, treeItems) {
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
        fullPackageName = `${fullPackageName !== ''? '.' : ''}` + fullPackageName
        fullPackageName = currentTreeItem.data + fullPackageName
        currentTreeItem = treeItems[currentTreeItem.parentId]
      }

      packageNames.push({ nodeId: treeItem.index, packageName: fullPackageName })
    }
  }

  // Add package attribute to UML nodes
  nodes.forEach((node) => {
    console.log('UML node: ', node)
    let newNode = { ...node, data: {
        ...node.data,
        package: packageNames[node.id]
      }}
    console.log('Mapped UML node:', newNode)
    packagedNodes.push(newNode)
  })

  return packagedNodes
}


function PackageTree() {

  const {
    nodes,
    newNode,
    deletedNodes, setDeletedNodes,
    focusedItem, setFocusedItem,
    expandedItems, setExpandedItems,
    selectedItems, setSelectedItems,
    treeItems, setTreeItems
  } = useAppContext()


  useEffect(() => {
    handleAddUmlNode(newNode)
  }, [newNode])

  useEffect(() => {
    deletedNodes.forEach(node => {
      handleDelete(treeItems[node.id])
    })
  }, [deletedNodes]);


  const handleAddUmlNode = useCallback(
    (umlNode) => {
      if (!umlNode) return

      console.log('Adding new node to project tree.')

      const focusedItemIndex = focusedItem?
          (treeItems[focusedItem].isFolder ? focusedItem : treeItems[focusedItem].parentId)
          : 'root'

      console.log('Adding class to package: ', focusedItemIndex)

      const treeClassItem = {
        index: umlNode.id,
        isFolder: false,
        children: [],
        data: umlNode.data.name,
        parentId: focusedItemIndex
      }

      console.log('Adding item:', treeClassItem, 'to the tree')

      let updatedTreeItems = treeItems

      // Add new tree class item to the tree
      updatedTreeItems[umlNode.id] = treeClassItem

      // Append new tree class to focused item children list
      const treeFocusedItem = updatedTreeItems[focusedItemIndex]
      updatedTreeItems[focusedItemIndex] = {
        ...treeFocusedItem,
        children: [...treeFocusedItem.children, treeClassItem.index]
      }

      setTreeItems(() => updatedTreeItems)
    }, [treeItems, focusedItem])


  const handleAddPackage = (e, item) => {

    console.log('Adding package')

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

    if (!item || item.index === 'root') return

    console.log('Deleting item: ', item, 'from tree items:', treeItems);
    let updatedSelectedItems = [...selectedItems]
    const updatedTreeItems = { ...treeItems };

    // Recursively delete children
    if (item.isFolder) {
      item.children.forEach((child) => {
        handleDelete(treeItems[child]);
      })
    }
    else {
      const deletedNode = nodes.find((node) => (node.id === item.index))
      setDeletedNodes((prevDeletedNodes) => ([...prevDeletedNodes, deletedNode]))
    }

    // Delete tree item
    delete updatedTreeItems[item.index];
    updatedSelectedItems = updatedSelectedItems.filter((selectedItem) =>
        (selectedItem.index !== item.index))

    // Delete tree item from children list of all items
    for (const treeItemKey in updatedTreeItems) {
      let treeItem = updatedTreeItems[treeItemKey]
      if (treeItem.isFolder) {
        treeItem = {
          ...treeItem,
          children: treeItem.children.filter((i) => i !== item.index)
        }
        updatedTreeItems[treeItem.index] = treeItem;
      }
    }

    setTreeItems(() => updatedTreeItems);
    setSelectedItems(() => updatedSelectedItems)
    setFocusedItem(() => (focusedItem === item.index)? null : focusedItem)
    console.log('Updated tree items:', updatedTreeItems, 'after deleting item:', item)
  }


  const handleOnDrop = (items, target) => {
    const targetItem = treeItems[target.targetItem];
    const updatedTreeItems = { ...treeItems };

    items.forEach((item) => {
      if (item.parentId) {
        if (targetItem.index === item.parentId) return;

        const parentItem = treeItems[item.parentId];
        const updatedChildren = parentItem.children.filter((c) => c !== item.index);
        updatedTreeItems[item.parentId] = {
          ...parentItem,
          children: updatedChildren,
        };
      }

      updatedTreeItems[targetItem.index] = {
        ...targetItem,
        children: [...targetItem.children, item.index],
      };

      updatedTreeItems[item.index] = {
        ...item,
        parentId: targetItem.index,
      };
    });

    setTreeItems(() => updatedTreeItems);
  };

  const handleOnRename = (item, name) => {
    const updatedTreeItems = { ...treeItems };

    updatedTreeItems[item.index].data = name;

    setTreeItems(() => updatedTreeItems);
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
        />)
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
          renderItemTitle={({title, item}) => renderCustomTreeItem(title, item)}
      >
        <Tree treeId="tree-1" rootItem="virtualRoot" treeLabel="Tree Example" />
      </ControlledTreeEnvironment>
  );
}

export default PackageTree;