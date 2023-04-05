import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {name: '', comment: '', commentList: [], noOfComments: 0}

  onAddComment = event => {
    event.preventDefault()
    const {name, comment, commentList, noOfComments} = this.state
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      noOfComments: prevState.noOfComments + 1,
      name: '',
      comment: '',
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onLikeComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(each => {
        if (id === each.id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  onDeleteComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.filter(
        eachComment => eachComment.id !== id,
      ),
    }))

    this.setState(prevState => ({noOfComments: prevState.noOfComments - 1}))
  }

  render() {
    const {name, comment, commentList, noOfComments} = this.state

    let isCommentsExists = true
    if (noOfComments === 0) {
      isCommentsExists = false
    } else {
      isCommentsExists = true
    }

    return (
      <div className="bg-container">
        <div className="main-container">
          <div className="content-container">
            <h1 className="heading">Comments</h1>
            <p className="input-desc">Say something about 4.0 Technologies</p>
            <form className="form-container" onSubmit={this.onAddComment}>
              <input
                type="text"
                value={name}
                onChange={this.onChangeName}
                placeholder="Your name"
                className="input-name"
              />
              <textarea
                placeholder="Your comment"
                value={comment}
                rows="6"
                cols="36"
                className="input-comment"
                onChange={this.onChangeComment}
              />
              <button type="submit" className="add-comment">
                Add Comment
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr className="horizontal-line" />
        <div className="noOfComments-container">
          <p className="count">{noOfComments}</p>
          <p className="comment-para">Comments</p>
        </div>
        {isCommentsExists && (
          <ul className="list-container">
            {commentList.map(each => (
              <CommentItem
                eachComment={each}
                key={each.id}
                isLiked={false}
                onLikeComment={this.onLikeComment}
                onDeleteComment={this.onDeleteComment}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Comments
