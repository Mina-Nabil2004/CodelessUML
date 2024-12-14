import { useState, useRef, useCallback } from 'react';
import './index.css';

import ClassNode from './UMLComponents/ClassNode.jsx';
import InterfaceNode from './UMLComponents/InterfaceNode.jsx';
import EnumNode from './UMLComponents/EnumNode.jsx';
import AbstractClassNode from './UMLComponents/AbstractClassNode.jsx';
import { abstractClassNode, classNode, enumNode, initialNodes, interfaceNode } from './nodes.js';

import HorizontalSidebar from "./UIComponents/HorizontalSidebar.jsx";
import VerticalSidebar from "./UIComponents/VerticalSidebar.jsx";
import Button from "./UIComponents/Button.jsx";
import ContextMenu from "./UIComponents/ContextMenu/ContextMenu.jsx";

import TextIcon from './assets/HorizontalSidebarIcons/Text.png'
import NoteIcon from './assets/HorizontalSidebarIcons/Note.png'
import ClassIcon from './assets/HorizontalSidebarIcons/Class.png'
import AbstractClassIcon from './assets/HorizontalSidebarIcons/AbstractClass.png'
import InterfaceIcon from './assets/HorizontalSidebarIcons/Interface.png'
import EnumIcon from './assets/HorizontalSidebarIcons/Enum.png'

import UndoIcon from './assets/VerticalSidebarIcons/Undo.png'
import RedoIcon from './assets/VerticalSidebarIcons/Redo.png'
import ExportIcon from './assets/VerticalSidebarIcons/Export.png'
import ImportIcon from './assets/VerticalSidebarIcons/Import.png'
import AssociationIcon from "./assets/DropdownMenuIcons/Association.png";
import InheritanceIcon from "./assets/DropdownMenuIcons/Inheritance.png";
import ImplementationIcon from "./assets/DropdownMenuIcons/Implementation.png";
import DependencyIcon from "./assets/DropdownMenuIcons/Dependency.png";
import CompositionIcon from "./assets/DropdownMenuIcons/Composition.png";

import '@xyflow/react/dist/style.css';

import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SmoothStepEdge
} from '@xyflow/react';
import { useAppContext } from './AppContext.jsx';

const nodeTypes = {
  class: ClassNode,
  interface: InterfaceNode,
  enum: EnumNode,
  abstractClass: AbstractClassNode
};

const edgeTypes = {
  smoothstep: SmoothStepEdge,
};

const initialEdges = [
  // Add any initial edges here if needed
];

function UMLDiagram() {

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
    console.log(iconName)
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
        {
          ...params,
          style: { stroke: 'black', strokeWidth: 2 },
          type: 'smoothstep',
        },
        eds
      )
    );
  }, [setEdges]);

  return (
      <div
          onClick={handleOnClick}
          onContextMenu={handleOnContextMenu}
          style={{
            width: window.innerWidth,
            height: window.innerHeight,
          }}
      >
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineStyle={{stroke: '#000000', strokeWidth: 2}}
            connectionLineType="smoothstep"
            snapToGrid={true}
            snapGrid={[16, 16]}
        >
          <Controls className='controls' orientation="horizontal" position='bottom-right'/>
          <Background style={{zIndex: -1}} gap={16} size={1.5}/>
        </ReactFlow>

        <div className="generate-code-button-container">
          <Button text="GENERATE CODE"/>
        </div>
        <div className="vertical-sidebar-container">
          <VerticalSidebar items={verticalSidebarItems}/>
        </div>
        <div className="horizontal-sidebar-container">
          <HorizontalSidebar items={horizontalSidebarItems}/>
        </div>
        <ContextMenu
            contextMenuRef={contextMenuRef}
            items={menuItems}
            positionX={contextMenuStatus.position.x}
            positionY={contextMenuStatus.position.y}
            isToggled={contextMenuStatus.toggled}
        />
      </div>
  );
}

export default UMLDiagram;
