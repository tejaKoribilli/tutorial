// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {each} = props
  const {avatarUrl, name, starsCount, issuesCount, forksCount} = each

  return (
    <li className="list-item-container">
      <img className="language-img" src={avatarUrl} alt={name} />
      <div className="list-item-content-container">
        <h1 className="language-name">{name}</h1>
        <div className="icons-info-container">
          <img
            className="icon-img"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="icon-info">{starsCount} stars</p>
        </div>
        <div className="icons-info-container">
          <img
            className="icon-img"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="icon-info">{forksCount} forks</p>
        </div>
        <div className="icons-info-container">
          <img
            className="icon-img"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="icon-info">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
