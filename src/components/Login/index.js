import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, errorMsg, showErrorMsg} = this.state
    return (
      <div className="login-main-container">
        <div className="login-bg-container">
          <img
            className="website-logo-login"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <div className="form-input-container">
              <label htmlFor="username" className="login-input-label">
                USERNAME
              </label>
              <input
                className="login-input"
                type="text"
                placeholder="Username"
                id="username"
                onChange={this.onUsernameInput}
                value={username}
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="password" className="login-input-label">
                PASSWORD
              </label>
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                id="password"
                onChange={this.onPasswordInput}
                value={password}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrorMsg && (
              <p className="login-error-msg">{`*${errorMsg}`}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
