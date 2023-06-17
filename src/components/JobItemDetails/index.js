import {Component} from 'react'

import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobsCard from '../SimilarJobsCard'

import './index.css'

const apiStatusConstantsJobItem = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}
class JobItemDetails extends Component {
  state = {apiStatusJobItem: 'INITIAL', jobDetails: '', similarJobs: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  onJobsDetailsApiSuccess = data => {
    const jobDetails = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      lifeAtCompany: data.job_details.life_at_company,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      skills: data.job_details.skills,
      title: data.job_details.title,
    }
    jobDetails.lifeAtCompany = {
      description: jobDetails.lifeAtCompany.description,
      imageUrl: jobDetails.lifeAtCompany.image_url,
    }
    jobDetails.skills = jobDetails.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))

    const similarJobs = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({
      apiStatusJobItem: apiStatusConstantsJobItem.success,
      jobDetails,
      similarJobs,
    })
  }

  getJobItemDetails = async () => {
    this.setState({apiStatusJobItem: apiStatusConstantsJobItem.initial})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.onJobsDetailsApiSuccess(data)
    } else {
      this.setState({apiStatusJobItem: apiStatusConstantsJobItem.failure})
    }
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state

    return (
      <div className="similar-jobs-container">
        <h1 className="job-item-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(each => (
            <SimilarJobsCard eachItem={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobDetails} = this.state

    return (
      <>
        <div className="job-item-details-success-container">
          <>
            <div className="logo-title-rating-container">
              <img
                src={jobDetails.companyLogoUrl}
                alt="job details company logo"
                className="company-logo-url"
              />
              <div className="title-rating-container">
                <h1 className="job-title-heading">{jobDetails.title}</h1>
                <div className="rating-icon-container">
                  <AiFillStar className="star-img" />
                  <p className="job-rating">{jobDetails.rating}</p>
                </div>
              </div>
            </div>

            <div className="location-jobType-package-container">
              <MdLocationOn size={18} className="location-icon" />
              <p className="job-location">{jobDetails.location}</p>
              <BsFillBriefcaseFill className="briefcase-icon" />
              <p className="job-employment-type">{jobDetails.employmentType}</p>
              <p className="job-package">{jobDetails.packagePerAnnum}</p>
            </div>
            <hr />
            <div className="desc-visit-link-container">
              <h1 className="job-desc-heading">Description</h1>
              <a
                href={jobDetails.companyWebsiteUrl}
                className="visit-link-container"
              >
                <p>Visit</p>
                <BsBoxArrowUpRight className="visit-arrow-icon" />
              </a>
            </div>
            <p className="job-item-details-desc">{jobDetails.jobDescription}</p>
          </>
          <h1 className="job-item-heading">Skills</h1>
          <ul className="job-skills-list-container">
            {jobDetails.skills.map(each => (
              <SkillsCard eachSkill={each} key={each.name} />
            ))}
          </ul>
          <h1 className="job-item-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="job-item-details-desc">
              {jobDetails.lifeAtCompany.description}
            </p>
            <img
              className="life-at-company-img"
              src={jobDetails.lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  onReloadJobItemDetailsRoute = () => {
    this.getJobItemDetails()
  }

  renderFailureViewJobItemDetails = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.onReloadJobItemDetailsRoute}
      >
        Retry
      </button>
    </>
  )

  renderLoaderview = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSwitchCaseJobItemDetails = () => {
    const {apiStatusJobItem} = this.state
    switch (apiStatusJobItem) {
      case apiStatusConstantsJobItem.initial:
        return this.renderLoaderview()
      case apiStatusConstantsJobItem.inProgress:
        return this.renderLoaderview()
      case apiStatusConstantsJobItem.success:
        return this.renderSuccessView()
      case apiStatusConstantsJobItem.failure:
        return this.renderFailureViewJobItemDetails()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderSwitchCaseJobItemDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
