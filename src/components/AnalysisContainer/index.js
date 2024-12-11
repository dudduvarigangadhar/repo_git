import ProfileContext from '../../ProfileContext'
import Analysis from '../Analysis'

const AnalysisContainer = () => (
  <ProfileContext.Consumer>
    {value => {
      const {username} = value
      return <Analysis username={username} />
    }}
  </ProfileContext.Consumer>
)

export default AnalysisContainer
