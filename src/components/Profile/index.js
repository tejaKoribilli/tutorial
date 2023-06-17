import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Profile extends Component {
  state = {profileapiStatus: apiStatusConstants.initial, profileDetails: ''}

  componentDidMount() {
    this.getProfileDetails()
  }

  onFailure = () => {
    this.setState({profileapiStatus: apiStatusConstants.failure})
  }

  getProfileDetails = async () => {
    //  this.setState({profileapiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileapiStatus: apiStatusConstants.success,
        profileDetails,
      })
    } else {
      this.onFailure()
    }
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="user-profile-name">{name}</h1>
        <p className="user-profile-bio">{shortBio}</p>
      </div>
    )
  }

  onRetryProfileReload = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.onRetryProfileReload}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {profileapiStatus} = this.state
    switch (profileapiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoader()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      default:
        return null
    }
  }
}

export default Profile
