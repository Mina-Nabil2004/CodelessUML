import './UMLStyles.css'
import Input from "./Input";

function PackageBlock( { packageName } ) {
  
  return (
    <div className="packageBlock">
      <Input input={packageName}/>
    </div>
  )
}
export default PackageBlock