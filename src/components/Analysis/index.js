import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import LinearChart from '../LinearChart'
import LanguageRepoCountPie from '../LangRepoCountPie'
import LanguageCommitCountPie from '../LangCommitCountPie'
import RepoCommitCountPie from '../RepoCommitCountPie'
import './index.css'
import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Analysis extends Component {
  state = {apiStatus: apiConstants.initial, analysisData: {}}

  componentDidMount() {
    const {username} = this.props
    if (username === '') {
      this.renderNoDataFound()
    } else {
      this.getAnalysisData()
    }
  }

  getAnalysisData = async () => {
    const {username} = this.props
    this.setState({apiStatus: apiConstants.inProgress})
    // apiUrl
    const options = {
      method: 'GET',
    }

    const apiUrl = `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=`

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      this.setState({
        analysisData: data,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  analysisLoadingView = () => (
    <div className="analysis-loading-view">
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
      </div>
    </div>
  )

  renderNoDataFound = () => (
    <div className="analysis-render-no-data-found">
      <img
        src="https://res.cloudinary.com/diqwk5cdp/image/upload/v1732070791/Empty_Box_Illustration_1_dfkrvg.png"
        alt="empty analysis"
        className="analysis-no-data"
      />
      <h1 className="analysis-page-not-found-heading">No Data Found</h1>
      <p className="analysis-page-not-found-description">
        Github Username is empty. please provide a valid username for
        Repositories
      </p>
      <Link to="/">
        <button
          type="button"
          className="analysis-go-to-home"
          onClick={this.onClickGotoHome}
        >
          Go to Home
        </button>
      </Link>
    </div>
  )

  analysisSuccessView = () => {
    const {analysisData} = this.state

    const analysisListLength = Object.keys(analysisData).length === 0

    const {
      quarterCommitCount,
      langRepoCount,
      langCommitCount,
      repoCommitCount,
    } = analysisData

    const quarterCommitData = []
    const quarterCommitKeyNames = Object.keys(quarterCommitCount)
    quarterCommitKeyNames.forEach(keyName => {
      quarterCommitData.push({
        name: keyName,
        commits: quarterCommitCount[keyName],
      })
    })

    const quarterCommitSlicedData = quarterCommitData
      .sort(this.descendingSort)
      .slice(0, Object.keys(quarterCommitCount).length)

    const langRepoData = []
    const langRepoKeyNames = Object.keys(langRepoCount)
    langRepoKeyNames.forEach(keyName => {
      langRepoData.push({name: keyName, value: langRepoCount[keyName]})
    })
    const langRepoSlicedData = langRepoData
      .sort(this.descendingSort)
      .slice(0, Object.keys(langRepoCount).length)

    const langCommitData = []
    const langCommitKeyNames = Object.keys(langCommitCount)
    langCommitKeyNames.forEach(keyName => {
      langCommitData.push({name: keyName, value: langCommitCount[keyName]})
    })

    const langCommitSlicedData = langCommitData
      .sort(this.descendingSort)
      .slice(0, Object.keys(langCommitCount).length)

    const repoCommitData = []
    const repoCommitKeyNames = Object.keys(repoCommitCount)
    repoCommitKeyNames.forEach(keyName => {
      repoCommitData.push({name: keyName, value: repoCommitCount[keyName]})
    })
    const slicedData = repoCommitData.sort(this.descendingSort).slice(0, 10)

    return (
      <>
        <div>
          {analysisListLength ? (
            <div className="no-analysis-data-found">
              <>
                <img
                  src="https://res.cloudinary.com/diqwk5cdp/image/upload/v1730975419/Layer_3_unz7cw.png"
                  alt="no analysis"
                />
                <h1>No Analysis Data Found!</h1>
              </>
            </div>
          ) : (
            <div className="sm-analysis-div-container">
              <h1 className="analysis-main-heading">Analysis</h1>
              <div className="linear-chart-div-container">
                <div className="linear-chart-container">
                  <LinearChart quarterCommitCount={quarterCommitSlicedData} />
                </div>
              </div>
              <div className="language-piechart-container">
                <div className="lang-per-repo-container">
                  <h1 className="lang-per-repos-heading">Language Per Repos</h1>
                  <br />
                  <LanguageRepoCountPie langRepoCount={langRepoSlicedData} />
                </div>
                <div className="lang-per-commit-container">
                  <h1 className="lang-per-commit-heading">
                    Language Per Commits
                  </h1>
                  <br />
                  <LanguageCommitCountPie
                    langCommitCount={langCommitSlicedData}
                  />
                </div>
              </div>
              <div className="repoCommitDescContainer">
                <div className="repoCommitContainer">
                  <h1 className="commits-per-repo-heading">
                    Commits per Repo (Top 10)
                  </h1>

                  <RepoCommitCountPie repoCommitCount={slicedData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }

  onClickTryAgain = () => {
    this.getAnalysisData()
  }

  analysisFailureView = () => (
    <div className="analysisFailureContainer">
      <img
        src="https://res.cloudinary.com/diqwk5cdp/image/upload/v1730787654/Frame_8830_uvuzht.png"
        alt="failure view"
        className="error-view"
      />
      <p className="errorName">Something went wrong. Please try again</p>
      <button
        className="tryButton"
        type="button"
        onClick={this.onClickTryAgain}
      >
        Try again
      </button>
    </div>
  )

  renderAnalysisView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.analysisLoadingView()
      case apiConstants.success:
        return this.analysisSuccessView()
      case apiConstants.failure:
        return this.analysisFailureView()
      default:
        return null
    }
  }

  render() {
    const {username} = this.props
    return (
      <div className="analysis-container" data-testid="analysis">
        <Header />
        <div>
          {username === ''
            ? this.renderNoDataFound()
            : this.renderAnalysisView()}
        </div>
      </div>
    )
  }
}

export default Analysis
