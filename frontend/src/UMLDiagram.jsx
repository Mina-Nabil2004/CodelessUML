import './index.css';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Comp from './edges.jsx';

import { dependency, inheritance, association, composition, implementation } from './edges.jsx';


import ClassNode from './UMLComponents/ClassNode.jsx';
import InterfaceNode from './UMLComponents/InterfaceNode.jsx';
import EnumNode from './UMLComponents/EnumNode.jsx';
import AbstractClassNode from './UMLComponents/AbstractClassNode.jsx';
import { abstractClassNode, classNode, enumNode, interfaceNode } from './nodes.js';

import HorizontalToolbar from "./UIComponents/HorizontalToolbar.jsx";
import VerticalToolbar from "./UIComponents/VerticalToolbar.jsx";
import Button from "./UIComponents/Button.jsx";
import ContextMenu from "./UIComponents/ContextMenu/ContextMenu.jsx";
import Sidebar from "./UIComponents/Sidebar/Sidebar.jsx"
import ColorMapper from './UIComponents/ColorMapper/ColorMapper.jsx';

import TextIcon from './assets/HorizontalToolbarIcons/Text.png'
import NoteIcon from './assets/HorizontalToolbarIcons/Note.png'
import ClassIcon from './assets/HorizontalToolbarIcons/Class.png'
import AbstractClassIcon from './assets/HorizontalToolbarIcons/AbstractClass.png'
import InterfaceIcon from './assets/HorizontalToolbarIcons/Interface.png'
import EnumIcon from './assets/HorizontalToolbarIcons/Enum.png'

import UndoIcon from './assets/VerticalToolbarIcons/Undo.png'
import RedoIcon from './assets/VerticalToolbarIcons/Redo.png'
import ExportIcon from './assets/VerticalToolbarIcons/Export.png'
import ImportIcon from './assets/VerticalToolbarIcons/Import.png'
import AssociationIcon from "./assets/DropdownMenuIcons/Association.png";
import InheritanceIcon from "./assets/DropdownMenuIcons/Inheritance.png";
import ImplementationIcon from "./assets/DropdownMenuIcons/Implementation.png";
import DependencyIcon from "./assets/DropdownMenuIcons/Dependency.png";
import CompositionIcon from "./assets/DropdownMenuIcons/Composition.png";
import { useAppContext } from './AppContext.jsx';
import '@xyflow/react/dist/style.css';

import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  useOnSelectionChange,
  // panOnDrag,
  // panOnScroll,
  // selectNodesOnDrag,
  addEdge,
  SmoothStepEdge,
  SelectionMode,
} from '@xyflow/react';

const nodeTypes = {
  class: ClassNode,
  interface: InterfaceNode,
  enum: EnumNode,
  abstractClass: AbstractClassNode
};

const edgeTypes = {
  association,
  inheritance,
  implementation,
  dependency,
  composition,
  smoothstep: SmoothStepEdge
};


const initialEdges = [
  // Add any initial edges here if needed
];

function UMLDiagram() {
  
  const {
    nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange,
    createNode,
    nodeColors, setNodeColors,
    selectedEdgeType, setSelectedEdgeType,
    onNodesDelete, onEdgesDelete,
    selectedEdges, setSelectedEdges,
    selectedNodes, setSelectedNodes,
    treeItems, setTreeItems,
    generateUniqueId,
  } = useAppContext();
  
  const contextMenuRef = useRef(null);
  const [contextMenuStatus, setContextMenuStatus] = useState({
    position: {
      x: 0,
      y: 0
    },
    toggled: false,
  });

  const onChange = useCallback(({ nodes, edges }) => {

    setSelectedNodes(nodes.map((node) => node.id));
    setSelectedEdges(edges.map((edge) => edge.id));
  }, []);

  // useOnSelectionChange({
  //   onChange,
  // });

  function handleOnContextMenu(e) {

    e.preventDefault();

    const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();

    const isLeft = e.clientX < window.innerWidth / 2;
    const isTop = e.clientY < window.innerHeight / 2;

    let x;
    let y;

    if (isLeft) {
      x = e.clientX
    } else {
      x = e.clientX - contextMenuAttr.width;
    }

    if (isTop) {
      y = e.clientY
    } else {
      y = e.clientY - contextMenuAttr.height;
    }

    setContextMenuStatus(
      {
        position: {
          x: x,
          y: y
        },
        toggled: true
      }
    )

    console.log(contextMenuStatus)

  }

  function handleOnClick() {
    console.log('Selected UML nodes:', selectedNodes)
    console.log('Selected edges:', edges)
    setContextMenuStatus({
      ...contextMenuStatus,
      toggled: false
    });
  }

  function handleMenuClick(option) {
    console.log(option);
    setContextMenuStatus({
      ...contextMenuStatus,
      toggled: false
    });
  }

  function handleIconClick(iconName) {
    console.log(nodes)
    switch (iconName) {
      case 'Association':
        setSelectedEdgeType(association)
        break;
      case 'Implementation':
        setSelectedEdgeType(implementation)
        console.log(selectedEdgeType)
        break;
      case 'Dependency':
        setSelectedEdgeType(dependency)
        break;
      case 'Inheritance':
        setSelectedEdgeType(inheritance)
        console.log(selectedEdgeType)
        break;
      case 'Composition':
        setSelectedEdgeType(composition)
        console.log(selectedEdgeType)
        break;

      default:
        setSelectedEdgeType(inheritance)
        break;
    }
    console.log(iconName)
  }

  function handleGenerateCodeClick() {
    window.location.href = `${window.location.origin}/code-viewer`
  }

  const dropdownMenuItems = [
    {
      text: "Association",
      icon: { src: AssociationIcon, alt: 'Association' },
      onClick: () => handleIconClick('Association')
    },
    {
      text: "Inheritance",
      icon: { src: InheritanceIcon, alt: 'Inheritance' },
      onClick: () => handleIconClick('Inheritance')
    },
    {
      text: "Implementation",
      icon: { src: ImplementationIcon, alt: 'Implementation' },
      onClick: () => handleIconClick('Implementation')
    },
    {
      text: "Dependency",
      icon: { src: DependencyIcon, alt: 'Dependency' },
      onClick: () => handleIconClick('Dependency')
    },
    {
      text: "Composition",
      icon: { src: CompositionIcon, alt: 'Composition' },
      onClick: () => handleIconClick('Composition')
    }
  ]


  const horizontalSidebarItems = [
    { type: "icon", src: TextIcon, alt: 'Text', onClick: () => handleIconClick('Text') },
    { type: "icon", src: NoteIcon, alt: 'Note', onClick: () => handleIconClick('Note') },
    { type: "icon", src: ClassIcon, alt: 'Class', onClick: () => createNode('class') },
    { type: "icon", src: AbstractClassIcon, alt: 'Abstract Class', onClick: () => createNode('abstractClass') },
    { type: "icon", src: InterfaceIcon, alt: 'Interface', onClick: () => createNode('interface') },
    { type: "icon", src: EnumIcon, alt: 'Enum', onClick: () => createNode('enum') },
    { type: "dropdown", items: dropdownMenuItems, icon: {src: AssociationIcon, alt: 'Association'}},
  ]

  const verticalSidebarItems = [
    { src: UndoIcon, alt: 'Undo', onClick: () => handleIconClick('Undo') },
    { src: RedoIcon, alt: 'Redo', onClick: () => handleIconClick('Redo') },
    { src: ExportIcon, alt: 'Export', onClick: () => handleIconClick('Export') },
    { src: ImportIcon, alt: 'Import', onClick: () => handleIconClick('Import') },
  ]

  const menuItems = [
    { label: 'Copy', shortcut: 'Ctrl + C', onClick: () => handleMenuClick('Copy') },
    { label: 'Cut', shortcut: 'Ctrl + X', onClick: () => handleMenuClick('Cut') },
    { label: 'Paste', shortcut: 'Ctrl + V', onClick: () => handleMenuClick('Paste') },
    { label: 'Delete', divider: true },
    { label: 'Lock', shortcut: 'Ctrl + L', onClick: () => handleMenuClick('Lock'), divider: true },
    { label: 'Add attribute', onClick: () => handleMenuClick('Add attribute') },
    { label: 'Add method', onClick: () => handleMenuClick('Add method'), divider: true },
    { label: 'View constructors', onClick: () => handleMenuClick('View constructors') },
    { label: 'Move to package', onClick: () => handleMenuClick('Move to package') },
    { label: 'Add subclass', onClick: () => handleMenuClick('Add subclass'), divider: true },
    { label: 'Generate class', shortcut: 'Ctrl + G', onClick: () => handleMenuClick('Generate class') },
    { label: 'Generate getters', onClick: () => handleMenuClick('Generate getters') },
    { label: 'Generate setters', onClick: () => handleMenuClick('Generate setters') },
  ];


  function createClass() {
    const newClassNode = { ...classNode, id: generateUniqueId() }
    setNodes((prevNodes) => [...prevNodes, newClassNode]);
  }

  function createInterface() {
    const newInterfaceNode = { ...interfaceNode, id: generateUniqueId() }
    setNodes((prevNodes) => [...prevNodes, newInterfaceNode]);
  }

  function createAbstractClass() {
    const newAbstractClassNode = { ...abstractClassNode, id: generateUniqueId() }
    setNodes((prevNodes) => [...prevNodes, newAbstractClassNode]);
  }

  function createEnum() {
    const newEnumNode = { ...enumNode, id: generateUniqueId() }
    setNodes((prevNodes) => [...prevNodes, newEnumNode]);
  }


  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge({ ...selectedEdgeType, ...params }, eds)
    );
  }, [setEdges, selectedEdgeType, onEdgesChange]);

  // const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [],);

  const handleClassColorChange = (color) => {
    setNodeColors((prevNodeColors) => {
      return {
        ...prevNodeColors,
        class: color
      }
    })
  };

  const handleAbstractClassColorChange = (color) => {
    setNodeColors((prevNodeColors) => {
      return {
        ...prevNodeColors,
        abstractClass: color
      }
    })
  };

  const handleEnumColorChange = (color) => {
    setNodeColors((prevNodeColors) => {
      return {
        ...prevNodeColors,
        enum: color
      }
    })
  };

  const handleInterfaceColorChange = (color) => {
    setNodeColors((prevNodeColors) => {
      return {
        ...prevNodeColors,
        interface: color
      }
    })
  };

  return (
    <>
    <>
    <motion.div
        onClick={handleOnClick}
        onContextMenu={handleOnContextMenu}
        style={{
          width: window.innerWidth,
          height: window.innerHeight,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Comp />
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onNodesDelete={onNodesDelete}
          // onEdgesDelete={onEdgesDelete}
          onSelectionChange={onChange}
          onConnect={onConnect}
          connectionLineStyle={selectedEdgeType.style}
          connectionLineType={selectedEdgeType.type}
          snapToGrid={true}
          snapGrid={[16, 16]}
          // panOnScroll
          fitView
          selectionOnDrag
          panOnDrag={[1, 2]}
          // selectNodesOnDrag
          // SelectionMode={SelectionMode.Full}
          selectionMode={SelectionMode.Partial}
        >

          <Controls
            className='controls'
            orientation="horizontal"
            position='bottom-right'
            style={{
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              position: "fixed",
              bottom: "10px"
            }}
          />
          <Background style={{ zIndex: -1 }} gap={16} size={1.5} />
        </ReactFlow>

        <div className="generate-code-button-component">
          <Button text="GENERATE CODE" onClick={handleGenerateCodeClick} />
        </div>

        <div className="vertical-toolbar-component">
          <VerticalToolbar items={verticalSidebarItems} />
        </div>

        <div className="horizontal-toolbar-component">
          <HorizontalToolbar items={horizontalSidebarItems} />
        </div>

        {/* <ContextMenu
          contextMenuRef={contextMenuRef}
          items={menuItems}
          positionX={contextMenuStatus.position.x}
          positionY={contextMenuStatus.position.y}
          isToggled={contextMenuStatus.toggled}
        /> */}

        <div className='color-mapper-component'>
          <ColorMapper
            onChangeFunctions={[
              handleClassColorChange,
              handleAbstractClassColorChange,
              handleInterfaceColorChange,
              handleEnumColorChange,
            ]}
            nodeTypes={['Class', 'Abstract Class', 'Interface', 'Enum']}
          />
        </div>

        <div className="sidebar-component">
          <Sidebar />
        </div>

        <div className='project-name-container'>
          <p className='codeless-uml'>CodelessUML</p>
          <p className='project-name'>Project Name</p>
        </div>
      </motion.div>
    </>
    </>

  );
}

export default UMLDiagram;
