import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import * as Font from 'expo-font'

const UserContext = React.createContext()

class UserProvider extends Component {
  // Context state
  state = {
    user: null,
    cartData: [],
    cartTotal: 0
  }

  setUser = user => {
    this.setState(prevState => ({ user }))
  }

  setCartTotal = cartTotal => {
    this.setState(prevState => ({ cartTotal }))
  }

  setCartData = cartData => {
    this.setState(prevState => ({ cartData }))
  }

  async componentDidMount() {
    await Font.loadAsync({
      'poppins-normal': require('./assets/fonts/Poppins_400_normal.ttf')
    });
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
    const { cartData } = this.state
    const { user } = this.state
    const { cartTotal } = this.state
    const { setUser } = this
    const { isLoggedIn } = this
    const { setCartData } = this
    const { setCartTotal } = this

    return (
      <UserContext.Provider
        value={{
          user,
          cartData,
          cartTotal,
          setUser,
          isLoggedIn,
          setCartData,
          setCartTotal
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }