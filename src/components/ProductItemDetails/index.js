// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class ProductItemDetails extends Component {
  state = {productData: [], apiStatus: apiStatusConstants.initial, quantity: 1}

  componentDidMount() {
    this.getProductsDetails()
  }

  getProductsDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }

      const similarProductsData = fetchedData.similarProducts.map(each => ({
        availability: each.availability,
        brand: each.brand,
        description: each.description,
        id: each.id,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        style: each.style,
        title: each.title,
        totalReviews: each.total_reviews,
      }))
      fetchedData.similarProducts = similarProductsData

      this.setState({
        productData: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSimilarProducts = () => {
    const {productData} = this.state
    const {similarProducts} = productData

    return (
      <div className="similar-products-container">
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list-container">
          {similarProducts.map(each => (
            <SimilarProductItem each={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  renderProductDetails = () => {
    const {productData, quantity} = this.state
    const {
      imageUrl,
      title,
      price,
      totalReviews,
      rating,
      description,
      availability,
      brand,
    } = productData
    return (
      <div className="products-bg-container">
        <div className="product-container">
          <img className="products-img" src={imageUrl} alt="product" />
          <div className="product-details-container">
            <h1 className="product-title">{title}</h1>
            <p className="product-price">RS {price}/-</p>
            <div className="rating-review-container">
              <button type="button" className="rating-btn">
                <p>{rating} </p>
                <img
                  className="star-icon"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </button>
              <div className="total-revews-container">
                <p>{totalReviews} </p>
                <p className="mt-3">Reviews</p>
              </div>
            </div>
            <p className="product-description">{description}</p>
            <div className="availability-heading">
              <p>Availability: </p>
              <p className="availability-brand"> {availability}</p>
            </div>
            <div className="brand-heading">
              <p>Brand: </p>
              <p className="availability-brand"> {brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="plus-minus-btn"
                data-testid="minus"
                onClick={this.onDecrementQuantity}
              >
                <BsDashSquare className="quantity-icon" />
              </button>
              <p className="quantity-amount">{quantity}</p>
              <button
                type="button"
                className="plus-minus-btn"
                data-testid="plus"
                onClick={this.onIncrementQuantity}
              >
                <BsPlusSquare className="quantity-icon" />
              </button>
            </div>
            <button type="button" className="add-to-cart">
              ADD TO CART
            </button>
          </div>
        </div>
        {this.renderSimilarProducts()}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
      </div>
    </div>
  )

  onContinueShopping = () => {
    this.getProductsDetails()
  }

  renderFailureView = () => (
    <div className="render-failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1 className="render-failure-heading">Product Not Found</h1>
      <Link to="/products">
        <button
          type="button"
          className="continue-shopping-btn"
          onClick={this.onContinueShopping}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderSwitchCase = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.initial:
        return null
      default:
        return null
    }
  }

  render() {
    return (
      <div className="productsItem-main-container">
        <Header className="header-component" />
        {this.renderSwitchCase()}
      </div>
    )
  }
}

export default ProductItemDetails
