import './UMLStyles.css'

function PackageBlock(props) {

  return (
      <div className="packageBlock">
        {props.packageName}
      </div>
    )
}
export default PackageBlock