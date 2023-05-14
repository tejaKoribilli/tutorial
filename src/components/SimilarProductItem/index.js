// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {each} = props
  const {brand, imageUrl, price, rating, title} = each

  return (
    <li className="similar-products-list-item">
      <img
        className="similar-products-img"
        src={imageUrl}
        alt={`similar product ${title}`}
      />
      <h1 className="similar-products-title">{title}</h1>
      <p className="similar-product-brand">by {brand}</p>
      <div className="price-rating-container">
        <p className="similar-products-price">Rs {price}/-</p>
        <button type="button" className="similar-products-rating">
          {rating}
          <img
            className="rating-star"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </button>
      </div>
    </li>
  )
}

export default SimilarProductItem
