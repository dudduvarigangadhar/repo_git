import ProfileContext from '../../ProfileContext'
import Repository from '../Repository'

const RepositoryContainer = () => (
  <ProfileContext.Consumer>
    {value => {
      const {username} = value
      console.log('container', username)
      return <Repository username={username} />
    }}
  </ProfileContext.Consumer>
)

export default RepositoryContainer
