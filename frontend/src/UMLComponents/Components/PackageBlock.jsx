import './UMLStyles.css'

function PackageBlock(props) {
  const styles = {
    packageName: {
      width: `100px`,
    }
  };
  return (
      <div style={styles.packageName} className="packageBlock">
        {props.packageName}
      </div>
    )
}
export default PackageBlock