// Write your code here
import './index.css'

const CommentItem = props => {
  const {eachComment, onLikeComment, onDeleteComment} = props
  const {id, name, comment, isLiked} = eachComment
  const charLetter = name.charAt(0)

  const likedUrl =
    'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
  const likeUrl =
    'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeBtnUrl = isLiked ? likedUrl : likeUrl

  const onLike = () => {
    onLikeComment(id)
  }

  const onDelete = () => {
    onDeleteComment(id)
  }

  return (
    <li className="comments-item-container">
      <div className="comments-top-container">
        <p className="name-logo">{charLetter}</p>
        <p className="user-name">{name}</p>
        <p className="comment-time">less than a minute ago</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="image-container">
        <button type="button" className="like-container" onClick={onLike}>
          <img className="like-image" src={likeBtnUrl} alt="like" />
          <p className="like">Like</p>
        </button>
        <button type="button" data-testid="delete" className="delete-btn">
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
            onClick={onDelete}
          />
        </button>
      </div>
      <hr className="horizontal-line" />
    </li>
  )
}

export default CommentItem
