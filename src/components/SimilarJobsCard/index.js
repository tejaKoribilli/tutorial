import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobsCard = props => {
  const {eachItem} = props

  return (
    <li className="similar-job-card-container">
      <div className="similarjobs-logo-role-container">
        <img
          className="company-logo-url"
          src={eachItem.companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="title-rating-container">
          <h1 className="job-title-heading">{eachItem.title}</h1>
          <div className="rating-icon-container">
            <AiFillStar className="star-img" />
            <p className="job-rating">{eachItem.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-card-desc-heading">Description</h1>
      <p className="similar-job-card-desc">{eachItem.jobDescription}</p>
      <div className="location-jobType-container">
        <p className="job-location">{eachItem.location}</p>
        <BsFillBriefcaseFill className="briefcase-icon" />
        <p className="job-employment-type">{eachItem.employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobsCard
