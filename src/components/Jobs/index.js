import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import FilterGroup from '../FilterGroup'
import AllJobsList from '../AllJobsList'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}
class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    totalJobs: 0,
    activeSalaryTab: '',
    empTypeList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  onApiSuccess = data => {
    const jobsList = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({
      apiStatus: apiStatusConstants.success,
      jobsList,
      totalJobs: data.total,
    })
  }

  getJobsList = async () => {
    const {activeSalaryTab, empTypeList, searchInput} = this.state
    const empTypeStr = empTypeList.join(',')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empTypeStr}&minimum_package=${activeSalaryTab}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.onApiSuccess(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  selectSalaryRange = activeSalaryTab => {
    this.setState({activeSalaryTab}, this.getJobsList)
  }

  addselectEmpTypeList = empType => {
    const {empTypeList} = this.state

    if (empTypeList.includes(empType)) {
      const index = empTypeList.indexOf(empType)
      empTypeList.splice(index, 1)

      this.setState({empTypeList}, this.getJobsList)
    } else {
      this.setState(
        prevState => ({
          empTypeList: [...prevState.empTypeList, empType],
        }),
        this.getJobsList,
      )
    }
  }

  renderNoJobsView = () => (
    <div className="failure-no-jobs-view">
      <img
        className="jobs-list-failure-view"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderAllJobsList = () => {
    const {jobsList, totalJobs} = this.state
    return (
      <>
        <div className="allJobsList-container">
          {totalJobs > 0 ? (
            <AllJobsList jobsList={jobsList} />
          ) : (
            this.renderNoJobsView()
          )}
        </div>
      </>
    )
  }

  onReloadJobsRoute = () => {
    this.getJobsList()
  }

  renderFailureView = () => (
    <div className="failure-no-jobs-view">
      <img
        className="jobs-list-failure-view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.onReloadJobsRoute}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderview = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSwitchForJobsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoaderview()
      case apiStatusConstants.inProgress:
        return this.renderLoaderview()
      case apiStatusConstants.success:
        return this.renderAllJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearchBtn = () => {
    this.getJobsList()
  }

  render() {
    const {activeSalaryTab, empTypeList, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-filter-jobsList-container">
          <div className="mobile-search-container">
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              value={searchInput}
            />
            <button
              className="search-btn"
              type="button"
              data-testid="searchButton"
              onClick={this.onClickSearchBtn}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="renderFilterProfile-container">
            <Profile />
            <hr />
            <FilterGroup
              activeSalaryTab={activeSalaryTab}
              selectSalaryRange={this.selectSalaryRange}
              addselectEmpTypeList={this.addselectEmpTypeList}
              empTypeList={empTypeList}
            />
          </div>
          <div>
            <div className="search-container">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                className="search-btn"
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchBtn}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderSwitchForJobsList()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
