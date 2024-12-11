import {Component} from 'react'

import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import Languages from '../Languages'
import Contributors from '../Contributors'
import PieChart from '../PieChart'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'In_Progress',
}

class RepoItemDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    repoItemDetailsList: {},
  }

  componentDidMount() {
    this.getRepoDetails()
  }

  getContributors = contributor => ({
    avatarUrl: contributor.avatar_url,
    contribution: contributor.contribution,
    eventsUrl: contributor.events_url,
    followersUrl: contributor.followers_url,
    followingUrl: contributor.following_url,
    gistsUrl: contributor.gists_url,
    gravatarId: contributor.gravatar_id,
    htmlUrl: contributor.html_url,
    id: contributor.id,
    login: contributor.login,
    nodeId: contributor.node_id,
    organizationsUrl: contributor.organizations_url,
    receivedEventsUrl: contributor.received_events_url,
    reposUrl: contributor.repos_url,
    siteAdmin: contributor.site_admin,
    starredUrl: contributor.starred_url,
    subscriptionsUrl: contributor.subscriptions_url,
    type: contributor.type,
    url: contributor.url,
  })

  getOwner = owner => ({
    avatarUrl: owner.avatar_url,
    eventsUrl: owner.events_url,
    followersUrl: owner.followers_url,
    followingUrl: owner.following_url,
    gistsUrl: owner.gists_url,
    gravatarId: owner.gravatar_id,
    htmlUrl: owner.html_url,
    id: owner.id,
    login: owner.login,
    nodeId: owner.node_id,
    organizationsUrl: owner.organizations_url,
    receivedEventsUrl: owner.received_events_url,
    reposUrl: owner.repos_url,
    siteAdmin: owner.site_admin,
    starredUrl: owner.starred_url,
    subscriptionsUrl: owner.subscriptions_url,
    type: owner.type,
    url: owner.url,
  })

  getRepoDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {username, repoName} = this.props

    const options = {
      method: 'GET',
    }
    //   url

    const url = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=`

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        name: data.name,
        description: data.description,
        languages: data.lanuages,
        stargazersCount: data.stargazers_count,
        forksCount: data.forks_count,
        commitsCount: data.network_count,
        issuesCount: data.open_issues_count,
        contributors: data.contributors.map(contributor => ({
          avatarUrl: contributor.avatar_url,
          contributions: contributor.contributions,
          eventsUrl: contributor.events_url,
          followersUrl: contributor.followers_url,
          followingUrl: contributor.following_url,
          gistsUrl: contributor.gists_url,
          gravatarId: contributor.gravatar_id,
          htmlUrl: contributor.html_url,
          id: contributor.id,
          login: contributor.login,
          nodeId: contributor.node_id,
          organizationsUrl: contributor.organizations_url,
          receivedEventsUrl: contributor.received_events_url,
          reposUrl: contributor.repos_url,
          siteAdmin: contributor.site_admin,
          starredUrl: contributor.starred_url,
          subscriptionsUrl: contributor.subscriptions_url,
          type: contributor.type,
          url: contributor.url,
        })),
        owner: this.getOwner(data.owner),
        watchersCount: data.watchers_count,
      }
      this.setState({
        apiStatus: apiConstants.success,
        repoItemDetailsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderRepoItemDetailsViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.repoItemDetailsSuccess()
      case apiConstants.failure:
        return this.repoItemDetailsFailure()
      case apiConstants.inProgress:
        return this.repoItemDetailsLoading()
      default:
        return null
    }
  }

  repoItemDetailsSuccess = () => {
    const {repoItemDetailsList} = this.state
    const {
      name,
      description,
      languages,
      forksCount,
      stargazersCount,
      watchersCount,
      issuesCount,
      contributors,
    } = repoItemDetailsList
    const contributorLength = contributors.length
    return (
      <div className="repoItemDetails-success-view">
        <div>
          <h1 className="repoItemDetails-main-heading">{name}</h1>
        </div>
        <p>{description}</p>
        <div>
          <ul className="repoItemDetails-languages-container">
            {languages.map(eachLanguage => (
              <Languages
                key={eachLanguage.value}
                languageDetails={eachLanguage}
              />
            ))}
          </ul>
        </div>
        <div className="star-and-forks-container">
          <div className="star-count-container">
            <img
              src="https://res.cloudinary.com/diqwk5cdp/image/upload/v1731339192/Star_-_16px.1_zgg6a9.png"
              alt="star"
            />
            <p className="star-count">{stargazersCount}</p>
          </div>
          <div className="forks-container">
            <img
              src="https://res.cloudinary.com/diqwk5cdp/image/upload/v1731339192/Git_3_gqyitj.png"
              alt="git"
            />
            <p className="forks-count">{forksCount}</p>
          </div>
        </div>
        <div className="commits-and-issues">
          <div className="commits-and-issues-container">
            <p className="container-heading">Watchers Counts</p>
            <p className="container-count">{watchersCount}</p>
          </div>
          <div className="commits-and-issues-container">
            <p className="container-heading">Issues Counts</p>
            <p className="container-count">{issuesCount}</p>
          </div>
        </div>
        <div>
          <h1 className="contributors-heading">Contributors </h1>
          <p className="contributors-length">
            {contributorLength} {contributorLength === 1 ? 'Member' : 'Members'}
          </p>
          <div>
            {contributors.map(eachContributor => (
              <Contributors
                contributorDetails={eachContributor}
                key={eachContributor.id}
              />
            ))}
          </div>
        </div>
        <h1 className="languages-heading">Languages </h1>
        <div className="piechat-container">
          <PieChart languages={languages} />
        </div>
      </div>
    )
  }

  onClickTryAgain = () => {
    this.getRepoDetails()
  }

  repoItemDetailsFailure = () => (
    <div className="repo-item-details-failure">
      <div className="repo-item-details-failure-inner-div">
        <img
          src="https://res.cloudinary.com/diqwk5cdp/image/upload/v1730787654/Frame_8830_uvuzht.png"
          alt="failure view"
          className="error-view"
        />
        <p className="failure-view-message">
          Something went wrong. Please try again
        </p>
        <button
          className="try-again-button"
          type="button"
          onClick={this.onClickTryAgain}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  repoItemDetailsLoading = () => (
    <div className="loader-div-container" data-testid="loader">
      <div className="loader-container">
        <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
      </div>
    </div>
  )

  render() {
    return (
      <>
        <div className="repository-views-container" data-testid="repoItem">
          <Header />
          {this.renderRepoItemDetailsViews()}
        </div>
      </>
    )
  }
}

export default RepoItemDetails
