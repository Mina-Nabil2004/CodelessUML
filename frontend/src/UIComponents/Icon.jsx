import { useState } from "react";

function Icon({ src, alt, onClick }) {

  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    backgroundColor: isHovered ? "#322a4c" : "#221c32",
    borderRadius: "8px",
    padding: "5px",
    height: "100%",
    width: "100%",
    cursor: "pointer",
    transition: "background-color 0.1s ease",
  }

  return (
      <img
          src={src}
          alt={alt}
          title={alt}
          style={styles}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
       />
  );
}

export default Icon;