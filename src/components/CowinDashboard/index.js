// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const apiStatusContants = {
  initial: ' INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}
class CowinDashboard extends Component {
  state = {
    coWinData: [],
    apiStatus: apiStatusContants.initial,
  }

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    this.setState({apiStatus: apiStatusContants.inProgress})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()

      const fetchedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      const last7DaysVaccinationUpdated = fetchedData.last7DaysVaccination.map(
        each => ({
          dose1: each.dose_1,
          dose2: each.dose_2,
          vaccineDate: each.vaccine_date,
        }),
      )
      fetchedData.last7DaysVaccination = last7DaysVaccinationUpdated

      this.setState({
        apiStatus: apiStatusContants.success,
        coWinData: fetchedData,
      })
    } else {
      this.setState({apiStatus: apiStatusContants.failure})
    }
  }

  renderCowinData = () => {
    const {coWinData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = coWinData

    return (
      <>
        <div className="vaccination-container">
          <h1 className="vaccination-heading">Vaccination Coverage</h1>
          <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        </div>
        <div className="vaccination-container">
          <h1 className="vaccination-heading">Vaccination by gender</h1>
          <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        </div>
        <div className="vaccination-container">
          <h1 className="vaccination-heading">Vaccination by Age</h1>
          <VaccinationByAge vaccinationByAge={vaccinationByAge} />
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContants.initial:
        return null
      case apiStatusContants.success:
        return this.renderCowinData()
      case apiStatusContants.failure:
        return this.renderFailureView()
      case apiStatusContants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="CowinDashboard-bg-container">
        <div className="website-logo-container">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="coWin-heading">Co-WIN</h1>
        </div>
        <h1 className="co-Vaccination-heading">CoWIN Vaccination in India</h1>

        {this.renderSwitchCase()}
      </div>
    )
  }
}

export default CowinDashboard
