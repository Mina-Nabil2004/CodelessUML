import './UMLStyles.css'
import Input from "./Input";

function PackageBlock( { packageName } ) {

  function onInputChange(newName) {
    console.log()
  }

  return (
    <div className="packageBlock">
      <Input input={packageName}/>
    </div>
  )
}
export default PackageBlock