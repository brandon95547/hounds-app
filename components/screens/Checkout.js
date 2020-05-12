import React, { Component } from 'react';
import { Picker, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, AsyncStorage, ActivityIndicator } from 'react-native';
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
      expMonth: "",
      expYear: "",
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
  expMonthOnChange(month) {
    this.setState({ expMonth: month })
  }
  expYearOnChange(year) {
    this.setState({ expYear: year })
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
      let message = ""
      if(this.state.name == "" || this.state.card == "" || this.state.expiration == "" || this.state.cvv == "" || this.state.zip == "") {
        success = false
        message = "All fields are required"
      }
      else if(this.state.card.length < 15) {
        success = false
        message = "Not a valid credit card number"
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
        this.refs.childToast.showToast(colors.failure, message)
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
              <Picker
                selectedValue={this.state.expMonth}
                style={ styles.picker }
                onValueChange={(itemValue, itemIndex) => expMonthOnChange(itemValue)}
              >
                <Picker.Item label="Jan" value="01" />
                <Picker.Item label="Feb" value="02" />
                <Picker.Item label="Mar" value="03" />
                <Picker.Item label="Apr" value="04" />
                <Picker.Item label="May" value="05" />
                <Picker.Item label="Jun" value="06" />
                <Picker.Item label="Jul" value="07" />
                <Picker.Item label="Aug" value="08" />
                <Picker.Item label="Sep" value="09" />
                <Picker.Item label="Oct" value="10" />
                <Picker.Item label="Nov" value="11" />
                <Picker.Item label="Dec" value="12" />
              </Picker>
              <Picker
                selectedValue={this.state.expYear}
                style={ styles.picker }
                onValueChange={(itemValue, itemIndex) => expYearOnChange(itemValue)}
              >
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
                <Picker.Item label="2025" value="2025" />
                <Picker.Item label="2026" value="2026" />
                <Picker.Item label="2027" value="2027" />
                <Picker.Item label="2028" value="2028" />
                <Picker.Item label="2029" value="2029" />
                <Picker.Item label="2030" value="2030" />
                <Picker.Item label="2031" value="2031" />
                <Picker.Item label="2032" value="2032" />
                <Picker.Item label="2033" value="2033" />
                <Picker.Item label="2034" value="2034" />
                <Picker.Item label="2035" value="2035" />
                <Picker.Item label="2036" value="2036" />
                <Picker.Item label="2037" value="2037" />
                <Picker.Item label="2038" value="2038" />
                <Picker.Item label="2039" value="2039" />
                <Picker.Item label="2040" value="2040" />
              </Picker>
              <TextInput style = {styles.picker}
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

const activityIndicator = <Text style={{ marginBottom: 8, fontSize: 16 }}><ActivityIndicator size="small" color="#0000ff" /> processing</Text>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  picker: {
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 8,
    marginTop: 16,
    width: "33.3%"
  },
  total: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  totalText: {
    fontSize: 16,
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