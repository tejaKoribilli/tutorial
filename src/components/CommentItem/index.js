// Write your code here
import './index.css'

const CommentItem = props => {
  const {eachComment} = props
  console.log('comments Item called')
  console.log(eachComment)

  return (
    <li className="comments-item-container">
      <div className="comments-top-container">
        <p className="name-logo">R</p>
        <p className="user-name">Richard Branson</p>
        <p className="comment-time">less than a minute ago</p>
      </div>
      <p className="comment">
        Thanks for being so typically supportive and such a good friend, Elon
        Great to be opening up space for all.
      </p>
      <div className="image-container">
        <div className="like-container">
          <img
            className="like-image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png"
            alt="like"
          />
          <p className="like">Like</p>
        </div>
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
          alt="delete"
        />
      </div>
      <hr className="horizontal-line" />
    </li>
  )
}

export default CommentItem
