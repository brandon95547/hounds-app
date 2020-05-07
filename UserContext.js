import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

const UserContext = React.createContext()

class UserProvider extends Component {
  // Context state
  state = {
    user: null,
  }

  // Method to update state
  setUser = user => {
    this.setState(prevState => ({ user }))
  }

  isLoggedIn = async key => {
    let returnValue = null
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        this.setUser(JSON.parse(value))
      }
    } catch (error) {
      // Error retrieving data
    }
    if(returnValue) {
      this.setUser(JSON.parse(returnValue))
    }
  }

  render() {
    const { children } = this.props
    const { user } = this.state
    const { setUser } = this
    const { isLoggedIn } = this

    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
          isLoggedIn
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }