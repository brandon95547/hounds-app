import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, AsyncStorage, ActivityIndicator } from 'react-native';
import { Left, Right, Icon, Drawer, Container, Button } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import RaptorToast from '../RaptorToast'
import { globals, componentStyles, colors } from '../GlobalStyles';
import ReactDOM from "react-dom";
import * as Font from 'expo-font';
// this is our clobal context module to store global session state across screens
import UserContext from '../../UserContext'

import mapImage from '../../assets/img/map.png';

export default class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      assetsLoaded: false,
      todoInput: '',
      open: false,
      styles: {
        marginTop: 8
      },
      name: "",
      card: "",
      expiration: "",
      cvv: "",
      zip: "",
      cartData: [],
      displayTotals: true,
      displayLoading: false
    }

    this.toggleOpen = this.toggleOpen.bind(this);

  }

  isLoggedIn() {
    // let user = localStorage.getItem("user");
    // return user ? true : false
  }

  async componentDidMount() {
    /* await Font.loadAsync({
        'poppins-normal': require('../../assets/fonts/Poppins_400_normal.ttf')
    });
    this.setState({ assetsLoaded: true }); */
    // setState({ contentHeight: measureElement(this.content).height });
    // this.adjustGap();
    /* var node = ReactDOM.findDOMNode(this.refs["appHeader"]);
    this.setState({
      styles: {
        marginTop: node.offsetHeight
      }
    }); */
    this.getCartItems()
  }

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    );
  };

  async getCartItems() {
    let returnValue = null
    try {
      // empy cart on page load
      const value = await AsyncStorage.getItem('cart-items');
      if (value !== null) {
        // We have data!!
        returnValue = value
        const items = []
        const foodItems = JSON.parse(returnValue).filter(person => person !== null)
        
        let total = 0
        foodItems.forEach((subItem, subIndex) => {
          if(parseInt(subItem.quantity) != 0) {
            total += (subItem.price * parseInt(subItem.quantity))
            items.push([subItem.title, '$' + parseFloat(subItem.price).toFixed(2), parseInt(subItem.quantity)])
          }
        })

        this.setState({ cartData: items, cartTotal: total })

      }
    } catch (error) {
      // Error retrieving data
    }
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  nameOnChange(name) {
    this.setState({ name: name })
  }
  cardOnChange(card) {
    this.setState({ card: card })
  }
  expirationOnChange(exp) {
    this.setState({ expiration: exp })
  }
  cvvOnChange(cvv) {
    this.setState({ cvv: cvv })
  }
  zipOnChange(zip) {
    this.setState({ zip: zip })
  }

  processPayment() {
    console.log(this.state)
    this.toggleAnimationBox()
    this.toggleTotalsBox()
    setTimeout(async () => {
      this.toggleAnimationBox()
      this.toggleTotalsBox()
      await AsyncStorage.removeItem("cart-items")
      this.props.navigation.navigate('OrderSuccess');
    }, 1500);
  }

  toggleTotalsBox() {
    this.setState({ displayTotals: !this.state.displayTotals });
  }
  toggleAnimationBox() {
    this.setState({ displayLoading: !this.state.displayLoading });
  }

  render() {

    // let continueButtonPage = this.isLoggedIn() ? "StartPickup" : "Login";
    const Toast = <RaptorToast ref="childToast" showToast={true} message="my message" speed={1000} direction="top" />

    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width;

    const totalsBox = <Text style={{ textAlign: "right", fontSize: 17 }}>
    Cart Total: <Text style={{ color: colors.money, fontWeight: "bold" }}>${parseFloat(this.state.cartTotal + .3).toFixed(2)}</Text>
  </Text>

  const activityIndicator = <Text style={{ marginBottom: 8, fontSize: 17 }}><ActivityIndicator size="small" color="#0000ff" /> processing</Text>

    return (
      <MenuDrawer 
        open={this.state.open} 
        drawerContent={this.drawerContent()}
        drawerPercentage={65}
        animationTime={250}
        overlay={true}
        opacity={0.4}
      >   
          <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
          
          <View style={styles.container}>
            <View style={styles.pageTitleWrap}>
              <Text style={styles.pageTitle}>Checkout</Text>
            </View>
            <View style={styles.total}>
              {this.state.displayTotals && totalsBox}
              {this.state.displayLoading && activityIndicator}
            </View>
            <View>
              <TextInput style = {styles.textInput}
                underlineColorAndroid = "transparent"
                placeholder = "Name on card"
                placeholderTextColor = "#888"
                autoCapitalize = "none"
                onChangeText = {val => this.nameOnChange(val)}
              />
              <TextInput style = {styles.textInput}
                underlineColorAndroid = "transparent"
                placeholder = "Card number"
                placeholderTextColor = "#888"
                autoCapitalize = "none"
                onChangeText = {val => this.cardOnChange(val)}
              />
            </View>
            <View style={styles.split}>
              <TextInput style = {styles.textInputHalf}
                underlineColorAndroid = "transparent"
                placeholder = "Exp date: 01/2030"
                placeholderTextColor = "#888"
                autoCapitalize = "none"
                onChangeText = {val => this.expirationOnChange(val)}
              />
              <TextInput style = {styles.textInputHalf}
                underlineColorAndroid = "transparent"
                placeholder = "Security code"
                placeholderTextColor = "#888"
                autoCapitalize = "none"
                onChangeText = {val => this.cvvOnChange(val)}
              />
            </View>
            <View>
              <TextInput style = {styles.textInput}
                underlineColorAndroid = "transparent"
                placeholder = "Zip/Postal"
                placeholderTextColor = "#888"
                autoCapitalize = "none"
                onChangeText = {val => this.zipOnChange(val)}
              />
            </View>
            <Button onPress={() => this.processPayment()} block style={styles.submitButton}>
                <Text style={{color: "white", fontWeight: "bold"}}>PROCESS PAYMENT</Text>
            </Button>


            {Toast}
          </View>
      </MenuDrawer>
    );
  }
}

const formStyles = {
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  total: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  totalText: {
    textAlign: "right",
    fontSize: 17,
    fontWeight: "bold"
  },
  split: {
    flexDirection: "row"
  },
  textInputHalf: {
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 8,
    marginTop: 16,
    width: "50%"
  },
  textInput: {
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 8,
    marginTop: 16,
  },
  adjustGap: {
    marginTop: 0
  },
  pageTitleWrap: {
    marginBottom: 24
  },
  pageTitle: {
    fontSize: 17,
    fontWeight: "bold"
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginTop: 24
  }
});