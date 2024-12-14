import {  useState } from "react";

function Button({ text, onClick }) {

  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    fontFamily: "Arial Black",
    fontSize: "10px",
    color: "white",
    backgroundColor: isHovered ? "#322a4c" : "#221c32",
    border: "none",
    padding: "12px 20px",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "background-color 0.1s ease",
  }

  return (
      <button
          style={styles}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        {text}
      </button>
  )
}

export default Button;
