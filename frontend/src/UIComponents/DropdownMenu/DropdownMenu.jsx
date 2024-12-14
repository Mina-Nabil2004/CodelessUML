import { useState } from 'react';
import styles from './DropdownMenu.module.css'
import DropDownMenuItem from "./DropdownMenuItem.jsx";
import Icon from "../Icon.jsx";

function DropdownMenu({ items, icon}) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(icon);

  function handleIconClick() {
    setIsOpen(!isOpen);
  }

  function handleSelectedIcon(e) {
    const imgElement = e.currentTarget.querySelector('img');
    setSelectedIcon({
      src: imgElement.src,
      alt: imgElement.alt
    });
    setIsOpen(false);
  }

  return (
      <div className={styles['container']}>

        <div className={styles['menu']}
        style={
          {
            visibility: isOpen ? 'visible' : 'hidden',
            opacity: isOpen ? '1' : '0',
          }
        }
        >
          {items.map((item, index) => (
              <DropDownMenuItem
                  key={index}
                  text={item.text}
                  icon={item.icon}
                  onClick={(e) => {
                    item.onClick(e);
                    handleSelectedIcon(e);
                  }}
              />
          ))}
        </div>

        <div className={styles['icon']}>
          <Icon
              src={selectedIcon.src}
              alt={selectedIcon.alt}
              onClick={handleIconClick}
          />
        </div>
      </div>
  );
}

export default DropdownMenu;