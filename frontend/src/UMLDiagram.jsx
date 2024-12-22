import './index.css';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

import { dependency, inheritance, association, composition, implementation } from './edges.jsx';


import ClassNode from './UMLComponents/ClassNode.jsx';
import InterfaceNode from './UMLComponents/InterfaceNode.jsx';
import EnumNode from './UMLComponents/EnumNode.jsx';
import AbstractClassNode from './UMLComponents/AbstractClassNode.jsx';
import { abstractClassNode, classNode, enumNode, initialNodes, interfaceNode } from './nodes.js';

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
  addEdge,
  SmoothStepEdge
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
  smoothstep: SmoothStepEdge, // Default edge type
};


const initialEdges = [
  // Add any initial edges here if needed
];

function UMLDiagram() {

  const {
    nodeColors, setNodeColors,
    selectedEdge, setSelectedEdge
  } = useAppContext();

  const contextMenuRef = useRef(null);
  const [contextMenuStatus, setContextMenuStatus] = useState({
    position: {
      x: 0,
      y: 0
    },
    toggled: false,
  });

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
        setSelectedEdge(association)
        break;
      case 'Implementation':
        setSelectedEdge(implementation)
        console.log(selectedEdge)
        break;
      case 'Dependency':
        setSelectedEdge(dependency)
        break;
      case 'Inheritance':
        setSelectedEdge(inheritance)
        console.log(selectedEdge)
        break;
      case 'Composition':
        setSelectedEdge(composition)
        console.log(selectedEdge)
        break;
        
      default:
        setSelectedEdge(inheritance)
        break;
    }
    console.log(iconName)
  }

  function handleGenerateCodeClick(e) {
    window.location.href = `${window.location.origin}/code-viewer`
  }

  const dropdownMenuItems = [
    { text: "Association",
      icon: {src: AssociationIcon, alt: 'Association'},
      onClick: () => handleIconClick('Association')
    },
    {
      text: "Inheritance",
      icon: {src: InheritanceIcon, alt: 'Inheritance'},
      onClick: () => handleIconClick('Inheritance')
    },
    {
      text: "Implementation",
      icon: {src: ImplementationIcon, alt: 'Implementation'},
      onClick: () => handleIconClick('Implementation')
    },
    {
      text: "Dependency",
      icon: {src: DependencyIcon, alt: 'Dependency'},
      onClick: () => handleIconClick('Dependency')
    },
    {
      text: "Composition",
      icon: {src: CompositionIcon, alt: 'Composition'},
      onClick: () => handleIconClick('Composition')
    }
  ]

  const horizontalSidebarItems = [
    { type: "icon", src: TextIcon, alt: 'Text', onClick: () => handleIconClick('Text') },
    { type: "icon", src: NoteIcon, alt: 'Note', onClick: () => handleIconClick('Note') },
    { type: "icon", src: ClassIcon, alt: 'Class', onClick: () => createClass() },
    { type: "icon", src: AbstractClassIcon, alt: 'Abstract Class', onClick: () => createAbstractClass() },
    { type: "icon", src: InterfaceIcon, alt: 'Interface', onClick: () => createInterface() },
    { type: "icon", src: EnumIcon, alt: 'Enum', onClick: () => createEnum() },
    { type: "dropdown", items: dropdownMenuItems, icon: {src: AssociationIcon, alt: 'Association'}},
  ]

  const verticalSidebarItems = [
    { src: UndoIcon, alt: 'Undo', onClick: () => handleIconClick('Undo') },
    { src: RedoIcon, alt: 'Redo', onClick: () => handleIconClick('Redo') },
    { src: ExportIcon, alt: 'Export', onClick: () => handleIconClick('Export') },
    { src: ImportIcon, alt: 'Import', onClick: () => handleIconClick('Import') },
  ]

  const menuItems = [
    { label: 'Copy', shortcut: 'Ctrl + C', onClick: () => handleMenuClick('Copy')},
    { label: 'Cut', shortcut: 'Ctrl + X', onClick: () => handleMenuClick('Cut')},
    { label: 'Paste', shortcut: 'Ctrl + V', onClick: () => handleMenuClick('Paste')},
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

  const {
    nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange,
  } = useAppContext();

  function createClass() {
    setNodes((prevNodes) => [...prevNodes,{ ...classNode, id: `${nodes.length}` }]);
  }

  function createInterface() {
    setNodes((prevNodes) => [...prevNodes,{ ...interfaceNode, id: `${nodes.length}` }]);
  }

  function createAbstractClass() {
    setNodes((prevNodes) => [...prevNodes,{ ...abstractClassNode, id: `${nodes.length}` }]);
  }

  function createEnum() {
    setNodes((prevNodes) => [...prevNodes,{ ...enumNode, id: `${nodes.length}` }]);
  }
  

  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        { ...selectedEdge, ...params },
        eds
      )
    );
  }, [setEdges, selectedEdge, onEdgesChange]);
  
  // const onConnect = useCallback((params) => {
  //     setEdges((eds) =>
  //       addEdge(
  //         {
  //           ...params,
  //           type: selectedEdge.type || "smoothstep",
  //         },
  //         eds
  //       )
  //     );
  //   }, [setEdges, selectedEdge, onEdgesChange]);
  


  const handleClassColorChange = (color) => {
    // setClassColor(color);
    setNodeColors((prevNodeColors) => {
      return {
        ...prevNodeColors,
        class: color
      }
    })
    // updateNodeColor('1', color); // Optional: Change color if node exists
  };

  const handleAbstractClassColorChange = (color) => {
    // setAbstractClassColor(color);
    setNodeColors((prevNodeColors) => {
      return {
        ...prevNodeColors,
        abstractClass: color
      }
    })
    // updateNodeColor('2', color); // Optional: Change color if node exists
  };

  const handleEnumColorChange = (color) => {
    // setEnumColor(color);
    setNodeColors((prevNodeColors) => {
      return {
        ...prevNodeColors,
        enum: color
      }
    })
    // updateNodeColor('3', color); // Optional: Change color if node exists
  };

  const handleInterfaceColorChange = (color) => {
    // setInterfaceColor(color);
    setNodeColors((prevNodeColors) => {
      return {
        ...prevNodeColors,
        interface: color
      }
    })
    // updateNodeColor('4', color); // Optional: Change color if node exists
  };

  // Function to update node color
  
  // const updateNodeColor = (nodeId, color) => {
  //   setNodes((prevNodes) =>
  //     prevNodes.map((node) => 
  //       node.id === nodeId ? { ...node, color } : node
  //     )
  //   );
  // };


  return (
      <motion.div
        onClick={handleOnClick}
        onContextMenu={handleOnContextMenu}
        style={{
          width: window.innerWidth,
          height: window.innerHeight,
        }}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
      >
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineStyle={selectedEdge.style}
          connectionLineType={selectedEdge.type}
          snapToGrid={true}
          snapGrid={[16, 16]}
        >
          <Controls
            className='controls'
            orientation="horizontal"
            position='bottom-right'
            style= {{
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              position: "fixed",
              bottom: "10px"
            }}
          />
          <Background style={{zIndex: -1}} gap={16} size={1.5}/>
        </ReactFlow>

        <div className="generate-code-button-component">
          <Button text="GENERATE CODE" onClick={handleGenerateCodeClick}/>
        </div>
        
        <div className="vertical-toolbar-component">
          <VerticalToolbar items={verticalSidebarItems}/>
        </div>

        <div className="horizontal-toolbar-component">
          <HorizontalToolbar items={horizontalSidebarItems}/>
        </div>
        
        <ContextMenu
          contextMenuRef={contextMenuRef}
          items={menuItems}
          positionX={contextMenuStatus.position.x}
          positionY={contextMenuStatus.position.y}
          isToggled={contextMenuStatus.toggled}
        />
        
        <div className='color-mapper-component'>
          <ColorMapper
            onChangeFunctions={[
              handleClassColorChange,
              handleAbstractClassColorChange,
              handleInterfaceColorChange,
              handleEnumColorChange,
            ]}
            nodeTypes={['Class', 'Abstract Class', 'Interface',  'Enum']}
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

  );
}

export default UMLDiagram;
