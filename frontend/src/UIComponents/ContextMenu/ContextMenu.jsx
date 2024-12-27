import './ContextMenu.css';

function ContextMenu({
  positionX,
  positionY,
  isToggled,
  items,
  contextMenuRef
}) {

  return (
    <div
      ref={contextMenuRef}
      className={`context-menu ${isToggled ? 'active' : ''}`}
      style={{
        top: positionY + 2 + 'px',
        left: positionX + 2 + 'px',
      }}
    >
      {items.map((item, index) => (
        <div key={index}>
          <div
            className="menu-item"
            onClick={item.onClick}
          >
            <span>{item.label}</span>
            {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
          </div>
          {item.divider && <hr className="divider" />}
        </div>
      ))}
    </div>
  );
}

export default ContextMenu;
