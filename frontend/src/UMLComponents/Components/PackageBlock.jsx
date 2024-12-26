import './UMLStyles.css'
import Input from "./Input";

function PackageBlock( { packageName, id } ) {
  
  return (
    <div className="packageBlock">
      <Input input={packageName} id={id} type="package"/>
    </div>
  )
}
export default PackageBlock