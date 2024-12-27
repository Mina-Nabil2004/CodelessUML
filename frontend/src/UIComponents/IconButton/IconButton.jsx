import './IconButton.css'

function IconButton( { text, src, onClick } ) {
  return (
      <div className="icon-button" onClick={ onClick }>
        {text}
        <img
            className="icon-button-img"
            alt={text}
            src={src}
        />
      </div>
  )
}

export default IconButton;