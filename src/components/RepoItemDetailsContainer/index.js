import ProfileContext from '../../ProfileContext'
import RepoItemDetails from '../RepoItemDetails'

const RepoItemDetailsContainer = props => {
  const {match} = props
  const {params} = match
  const {repoName} = params

  return (
    <ProfileContext.Consumer>
      {value => {
        const {username} = value
        return <RepoItemDetails username={username} repoName={repoName} />
      }}
    </ProfileContext.Consumer>
  )
}

export default RepoItemDetailsContainer
