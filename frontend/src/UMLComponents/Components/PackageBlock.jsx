import './UMLStyles.css'
import Input from "./Input";

function PackageBlock( { packageName } ) {
  
  return (
    <div className="packageBlock">
      {packageName}
    </div>
  )
}
export default PackageBlock