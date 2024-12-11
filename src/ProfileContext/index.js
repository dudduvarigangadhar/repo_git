import React from 'react'

const ProfileContext = React.createContext({
  username: '',
  repo: '',
  changeProfileName: () => {},
  changeRepoName: () => {},
})

export default ProfileContext
