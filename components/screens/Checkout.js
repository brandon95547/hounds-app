import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, AsyncStorage, ActivityIndicator } from 'react-native';
import { Left, Right, Icon, Drawer, Container, Button } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import RaptorToast from '../RaptorToast'
import { globals, componentStyles, colors } from '../GlobalStyles';
import UserContext from '../../UserContext'

import mapImage from '../../assets/img/map.png';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

export default class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      assetsLoaded: false,
      open: false,
      name: "",
      card: "",
      expiration: "",
      cvv: "",
      zip: "",
      displayTotals: true,
      displayLoading: false
    }

    this.toggleOpen = this.toggleOpen.bind(this);

  }

  static contextType = UserContext

  componentDidMount() {
    const { isLoggedIn } = this.context
    isLoggedIn()
    
    this.setState({ assetsLoaded: true });
  }

  drawerContent = () => {
    return (
      <TouchableOpacity style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    );
  };

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

  getCartTotals = () => {
    const { cartData, setCartData } = this.context
    let total = .30

    const foodItems = cartData.filter(item => item !== null)

    foodItems.forEach((subItem, subIndex) => {
      if(parseInt(subItem.quantity) != 0) {
        total += (subItem.price * parseInt(subItem.quantity))
      }
    })

    return (<View><Text style={styles.totalText}>${total.toFixed(2)}</Text></View>)
  }

  processPayment() {
      let success = true
      if(this.state.name == "" || this.state.card == "" || this.state.expiration == "" || this.state.cvv == "" || this.state.zip == "") {
        success = false
      }
      if(success) {
        this.refs.childToast.showToast(colors.green, "Transaction successful")
        this.toggleAnimationBox()
        this.toggleTotalsBox()
        setTimeout(() => {
          this.toggleAnimationBox()
          this.toggleTotalsBox()
          this.props.navigation.navigate('OrderSuccess');
        }, 2500);
      }
      else {
        this.refs.childToast.showToast(colors.failure, "All fields are required")
      }
  }

  toggleTotalsBox() {
    this.setState({ displayTotals: !this.state.displayTotals });
  }
  toggleAnimationBox() {
    this.setState({ displayLoading: !this.state.displayLoading });
  }

  render() {
    const { user, cartData, cartTotal, setUser, isLoggedIn, setCartData } = this.context
    const Toast = <RaptorToast ref="childToast" showToast={true} message="my message" speed={1000} direction="top" />

    // let continueButtonPage = this.isLoggedIn() ? "StartPickup" : "Login";

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
              {this.state.displayTotals && this.getCartTotals()}
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

const activityIndicator = <Text style={{ marginBottom: 8, fontSize: 17 }}><ActivityIndicator size="small" color="#0000ff" /> processing</Text>
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
    fontSize: 17,
    fontWeight: "bold",
    color: colors.money
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