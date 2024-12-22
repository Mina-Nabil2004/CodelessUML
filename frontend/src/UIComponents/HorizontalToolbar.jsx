import Icon from './Icon.jsx';
import DropdownMenu from "./DropdownMenu/DropdownMenu.jsx";

function HorizontalToolbar({ items }) {

  const styles = {
    display: 'inline-flex',
    borderRadius: '120px',
    paddingRight: "35px",
    paddingLeft: "25px",
    paddingTop: "15px",
    paddingBottom: "5px",
    height: '17px',
    gap: '10px',
    alignItems: 'flex-end',
    backgroundColor: '#221c32',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)',
  }

  return (
    <div style={styles}>
      {items.map((item, index) => {
        switch (item.type) {
          case "icon":
            return (
              <Icon
                key={index}
                src={item.src}
                alt={item.alt}
                onClick={item.onClick}
              />
            );
          case "dropdown":
            return (
              <DropdownMenu
                key={index}
                items={item.items}
                icon={item.icon}
              />
            );
        }
      })}
    </div>
  );

}

export default HorizontalToolbar;