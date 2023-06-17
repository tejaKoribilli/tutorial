import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobsCard = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = each

  return (
    <Link to={`/jobs/${id}`} className="link-job-card">
      <li key={id} className="jobs-list-item-container">
        <div className="logo-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-url"
          />
          <div className="title-rating-container">
            <h1 className="job-title-heading">{title}</h1>
            <div className="rating-icon-container">
              <AiFillStar className="star-img" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-jobType-package-container">
          <MdLocationOn size={18} className="jobs-card-icon location-icon" />
          <p className="job-location">{location}</p>
          <BsFillBriefcaseFill className="jobs-card-icon" />
          <p className="job-employment-type">{employmentType}</p>
          <p className="job-package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-desc-heading">Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
