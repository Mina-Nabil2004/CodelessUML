function PackageBlock(props) {
  const styles = {
    packageName: {
      height: "30px",
      width: `${props.width / 2}px`,
      backgroundColor: "rgb(197, 207, 214)",
      textAlign: "center",
      padding: "3px",
      marginBottom: "-3px",
      color: "black",
      fontSize: "20px",
      border: "solid black",
      borderRadius: "20px 0px 0px 0px",
    }
  };
  return (
      <div style={styles.packageName}>
        {props.packageName}
      </div>
    )
}
export default PackageBlock