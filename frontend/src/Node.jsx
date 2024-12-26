import UMLComponent from './UMLComponents/Components/UMLComponent';

function createNode(node) {
   switch(node.type) {
      case "Class":
         return createClass(node);
      case "Interface":
         return createInterface(node);
      case "Enum":
         return createEnum(node);
      case "Abstract Class":
         return createAbstractClass(node);
      default:
         return;
   }
}

function createClass(node) {

   return (
    <UMLComponent
      color={node.color}
      width={node.width}
      packageName={node.packageName}
      name={node.name}
    />
   )
}

function createInterface(node) {

   return (
    <InterfaceNode
      color={node.color}
      width={node.width}
      packageName={node.packageName}
      name={node.name}
    />
   )
}

function createEnum(node) {

   return (
      <EnumNode
      color={node.color}
      width={node.width}
      packageName={node.packageName}
      name={node.name}
      />
   )
}

function createAbstractClass(node) {

   return (
      <AbstractClassNode
         color={node.color}
         width={node.width}
         packageName={node.packageName}
         name={node.name}
      />
   )
}
