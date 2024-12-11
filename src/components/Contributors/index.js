import './index.css'

const Contributors = props => {
  const {contributorDetails} = props
  console.log(contributorDetails)
  const {avatarUrl} = contributorDetails
  return (
    <div>
      <img
        src={avatarUrl}
        alt="contributor profile"
        className="contributorImg"
      />
    </div>
  )
}
export default Contributors
