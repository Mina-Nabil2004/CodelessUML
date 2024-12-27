import { useState } from "react";

function DropdownMenuItem({ text, icon, onClick }) {

  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "10px",
    alignItems: "center",
    fontFamily: "Segoe UI",

    fontSize: "12px",
    height: "10px",
    padding: "8px",
    borderRadius: "5px",
    backgroundColor: isHovered ? "#322a4c" : "#221c32",
    transition: "background-color 0.1s ease",
    cursor: "pointer",
  }

  return (
    <div
      style={styles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <p>{text}</p>
      <img
        src={icon.src}
        alt={icon.alt}
        onClick={icon.onClick}
        style={
          {
            height: "100%",
          }
        }
      />
    </div>
  )
}

export default DropdownMenuItem;