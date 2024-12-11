import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'
import Languages from '../Languages'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'In_Progress',
}
class Repository extends Component {
  state = {repos: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    const {username} = this.props
    if (username === '') {
      this.renderNoDataFound()
    } else {
      this.getGitRepoItems()
    }
  }

  getGitRepoItems = async () => {
    const {username} = this.props
    console.log('user', this.props)
    this.setState({apiStatus: apiConstants.inProgress})
    const options = {
      method: 'GET',
    }
    // api url

    const apiUrl = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=`
    const response = await fetch(apiUrl, options)
    let updatedData = null
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      updatedData = fetchedData.map(eachItem => ({
        name: eachItem.name,
        languages: eachItem.languages.map(eachLanguage => ({
          name: eachLanguage.name,
          value: eachLanguage.value,
          id: eachLanguage.value,
        })),
        forks: eachItem.forks,
        forksCount: eachItem.forks_count,
        forksUrl: eachItem.forks_url,
        id: eachItem.id,
        description: eachItem.description,
        stargazersCount: eachItem.stargazers_count,
        stargazersUrl: eachItem.stargazers_url,
      }))

      this.setState({repos: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderNoDataFound = () => (
    <div className="noDataFoundContainer">
      <>
        <img
          src="https://res.cloudinary.com/diqwk5cdp/image/upload/v1732070791/Empty_Box_Illustration_1_dfkrvg.png"
          alt="no data found"
          className="repo-no-data-img"
        />
        <h1 className="nodata-heading">No Data Found</h1>
        <p className="nodata-description">
          Github Username is empty, please provide a valid username for
          Repositories
        </p>
        <Link to="/">
          <button
            type="button"
            className="goto-home-button"
            onClick={this.onClickGotoHome}
          >
            Go to Home
          </button>
        </Link>
      </>
    </div>
  )

  repositorySuccessView = () => {
    const {repos} = this.state

    return (
      <div>
        <h1 className="repo-main-heading">Repositories</h1>
        <ul>
          {repos.map(eachItem => (
            <Link
              to={`/repositories/${eachItem.name}`}
              key={eachItem.id}
              className="repo-list-item-container"
            >
              <li className="repos-list-item">
                <h1 className="repo-heading">{eachItem.name}</h1>
                <p className="repo-description">{eachItem.description}</p>
                <div className="languages-list">
                  {eachItem.languages.map(language => (
                    <Languages
                      key={language.value}
                      languageDetails={language}
                    />
                  ))}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  onClickTryAgain = () => {
    this.getGitRepoItems()
  }

  repositoryFailureView = () => (
    <div className="repo-details-failure">
      <div className="repo-details-failure-inner-div">
        <img
          src="https://res.cloudinary.com/diqwk5cdp/image/upload/v1730787654/Frame_8830_uvuzht.png"
          alt="failure view"
          className="error-view"
        />
        <p className="repo-failure-view-message">
          Something went wrong. Please try again
        </p>
        <button
          className="try-again-button"
          type="button"
          onClick={this.onClickTryAgain}
        >
          Try again
        </button>
      </div>
    </div>
  )

  repositoryLoadingView = () => (
    <div className="loader-div-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
      </div>
    </div>
  )

  renderRepositoryViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.repositorySuccessView()
      case apiConstants.failure:
        return this.repositoryFailureView()
      case apiConstants.inProgress:
        return this.repositoryLoadingView()

      default:
        return null
    }
  }

  render() {
    const {username} = this.props
    return (
      <div className="repo-bg-container" data-testid="repository">
        <Header />
        <div>
          {username === ''
            ? this.renderNoDataFound()
            : this.renderRepositoryViews()}
        </div>
      </div>
    )
  }
}

export default Repository
