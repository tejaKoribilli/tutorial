import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const intialLanguageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusContants = {
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
  success: ' SUCCESS',
}

class GithubPopularRepos extends Component {
  state = {
    languageFiltersData: intialLanguageFiltersData,
    popularRepos: [],
    activeTabId: intialLanguageFiltersData[0].id,
    apiStatus: '',
  }

  componentDidMount() {
    this.getLangaugesList()
  }

  getLangaugesList = async () => {
    this.setState({apiStatus: apiStatusContants.inprogress})
    const {activeTabId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      const popularReposList = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        popularRepos: popularReposList,
        apiStatus: apiStatusContants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContants.failure})
    }
  }

  activeTabChange = id => {
    this.setState({activeTabId: id}, this.getLangaugesList)
  }

  renderLanguagesList = () => {
    const {popularRepos} = this.state
    return (
      <ul className="repositoryItem-list-container">
        {popularRepos.map(each => (
          <RepositoryItem each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <img
      className="failure-view"
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
    />
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSwitchcase = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContants.inprogress:
        return this.renderLoadingView()

      case apiStatusContants.success:
        return this.renderLanguagesList()

      case apiStatusContants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {languageFiltersData, activeTabId} = this.state

    return (
      <div className="github-repo-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="languageFilter-list-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              eachLanguage={eachLanguage}
              key={eachLanguage.id}
              isactive={eachLanguage.id === activeTabId}
              activeTabChange={this.activeTabChange}
            />
          ))}
        </ul>
        {this.renderSwitchcase()}
      </div>
    )
  }
}

export default GithubPopularRepos
