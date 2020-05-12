import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import * as Font from 'expo-font'

const UserContext = React.createContext()

class UserProvider extends Component {
  constructor(props) {
    super(props)
  }

  // Context state
  state = {
    user: null,
    cartData: [],
    cartTotal: 0,
    checkoutCart: null,
    itemToEdit: null,
    adminFoodItems: [],
    publicFoodItems: [
      [],[],[],[],[]
    ],
  }

  setUser = user => {
    this.setState(prevState => ({ user }))
  }

  setAdminFoodItems = adminFoodItems => {
    this.setState(prevState => ({ adminFoodItems }))
  }

  setPublicFoodItems = publicFoodItems => {
    this.setState(prevState => ({ publicFoodItems }))
  }

  setItemToEdit = itemToEdit => {
    this.setState(prevState => ({ itemToEdit }))
  }

  _storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data)
    } catch (error) {
      // Error saving data
    }
  }

  _retrieveCheckout = async (key) => {
    let returnValue = null
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        returnValue = value
      }
    } catch (error) {
      // Error retrieving data
    }
    if(returnValue) {
      this.setState({ cartData: JSON.parse(returnValue)})
    }
  };

  setCartTotal = cartTotal => {
    this.setState(prevState => ({ cartTotal }))
  }

  setCartData = cartData => {
    this.setState(prevState => ({ cartData }))
  }

  setCheckoutSummary = checkoutCart => {
    this.setState(prevState => ({ checkoutCart }))
  }

  async componentDidMount() {
    this._retrieveCheckout('cart-items')
    await Font.loadAsync({
      'poppins-normal': require('./assets/fonts/Poppins_400_normal.ttf')
    });
  }

  componentDidUpdate() {
    this._storeData("user", JSON.stringify(this.state.user))
    this._storeData("cart-items", JSON.stringify(this.state.cartData))
    this._storeData("cart-checkout", JSON.stringify(this.state.checkoutCart))
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
    const { itemToEdit } = this.state
    const { checkoutCart } = this.state
    const { adminFoodItems } = this.state
    const { publicFoodItems } = this.state
    const { user } = this.state
    const { cartTotal } = this.state
    const { setUser } = this
    const { isLoggedIn } = this
    const { setCartData } = this
    const { setCartTotal } = this
    const { setCheckoutSummary } = this
    const { setItemToEdit } = this
    const { setAdminFoodItems } = this
    const { setPublicFoodItems } = this

    return (
      <UserContext.Provider
        value={{
          user,
          cartData,
          checkoutCart,
          cartTotal,
          itemToEdit,
          adminFoodItems,
          publicFoodItems,
          setUser,
          isLoggedIn,
          setCartData,
          setCartTotal,
          setCheckoutSummary,
          setItemToEdit,
          setAdminFoodItems,
          setPublicFoodItems
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }