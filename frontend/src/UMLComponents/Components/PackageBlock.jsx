import './UMLStyles.css'

function PackageBlock(props) {
  const styles = {
    packageName: {
      width: `${props.width / 2}px`,
    }
  };
  return (
      <div style={styles.packageName} className="packageBlock">
        {props.packageName}
      </div>
    )
}
export default PackageBlock