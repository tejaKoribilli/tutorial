import './index.css'

// Write your code here.
const ThumbnailItem = props => {
  const {thumbNail, onChangeImage} = props
  const {thumbnailUrl, id, thumbnailAltText} = thumbNail

  const onClickThumbNail = () => {
    onChangeImage(id)
  }

  return (
    <li className="list-item">
      <button type="button" className="thumNail-btn">
        <img
          src={thumbnailUrl}
          alt={thumbnailAltText}
          onClick={onClickThumbNail}
        />
      </button>
    </li>
  )
}

export default ThumbnailItem
