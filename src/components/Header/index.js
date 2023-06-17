import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="header-routes-container">
        <Link to="/">
          <img
            className="website-logo-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <div className="header-mobile-view">
          <Link to="/" className="mobile-home-route-link">
            <AiFillHome className="header-icon" />
          </Link>
          <Link to="/jobs" className="mobile-header-jobs-route">
            <BsFillBriefcaseFill className="header-icon" />
          </Link>
          <FiLogOut className="header-icon" onClick={onLogout} />
        </div>
        <div className="header-no-mobile-view">
          <ul className="header-routes-container">
            <li className="home-route-link">
              <Link to="/" className="home-route-link">
                <h1>Home</h1>
              </Link>
            </li>
            <li className="header-jobs-route">
              <Link to="/jobs" className="header-jobs-route">
                <h1>Jobs</h1>
              </Link>
            </li>
            <li className="logout-route">
              <button
                className="header-btn logout-btn"
                type="button"
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
