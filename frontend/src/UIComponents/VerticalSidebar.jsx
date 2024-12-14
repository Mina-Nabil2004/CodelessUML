
import Icon from './Icon.jsx';

function VerticalSidebar({ items }) {

  const styles = {
    display: 'inline-flex',
    flexDirection: 'column',
    width: '14px',
    padding: '18px 10px',
    borderRadius: '25px',
    gap: '12px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#221c32',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)',
  }


  return (
      <div style={styles}>
        {items.map((icon, index) => (
            <Icon
                key={index}
                src={icon.src}
                alt={icon.alt}
                onClick={icon.onClick} />
        ))}
      </div>
  );

}

export default VerticalSidebar;