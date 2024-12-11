import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
// import {useState} from 'react'
import AnalysisContainer from './components/AnalysisContainer'
// import Header from './components/Header'
import Home from './components/Home'
import NotFound from './components/NotFound'

import RepositoryContainer from './components/RepositoryContainer'
import './App.css'
import ProfileContext from './ProfileContext'
import RepoItemDetailsContainer from './components/RepoItemDetailsContainer'

class App extends Component {
  state = {username: '', repoName: ''}

  changeRepoName = newRepoName => {
    this.setState({repoName: newRepoName})
  }

  changeProfileName = newUsername => {
    this.setState({username: newUsername})
  }

  render() {
    const {username, repoName} = this.state
    return (
      <ProfileContext.Provider
        value={{
          username,
          changeProfileName: this.changeProfileName,
          repoName,
          changeRepoName: this.changeRepoName,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/repositories" component={RepositoryContainer} />

          <Route
            exact
            path="/repositories/:repoName"
            component={RepoItemDetailsContainer}
          />
          <Route exact path="/analysis" component={AnalysisContainer} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ProfileContext.Provider>
    )
  }
}

export default App
