import React, { Component, useState } from 'react'
import { StyleSheet, View, ScrollView, Text, TextInput, Button, TouchableOpacity, TouchableHighlight, AsyncStorage, Picker, Modal, CheckBox, Alert } from 'react-native'
import { Left, Right, Icon, Drawer } from 'native-base'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import { colors } from '../GlobalStyles'
import UserContext from '../../UserContext'

export default class RaptorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: {},
      cart: [],
      modalVisible: false,
      foodOptions: '',
      lettuceChecked: [],
      tomatoChecked: [],
      picklesChecked: [],
      onionChecked: [],
      chiliChecked: [],
      slawChecked: [],
      cheeseChecked: [],
      jalapenosChecked: [],
      ketchupChecked: [],
      mustardChecked: [],
      ranchChecked: [],
      honeyMustardChecked: [],
      butterChecked: [],
      bbqChecked: [],
      // drinks
      cokeChecked: [],
      cokeZeroChecked: [],
      spriteChecked: [],
      sundropChecked: [],
      cherryLemonSundropChecked: [],
      cherryFantaChecked: [],
      drPepperChecked: [],
      goldPeakTeaChecked: [],
      countryTimeLemonadeChecked: [],
      itemToUpdate: 0,
      itemToUpdateTitle: '',
      itemToUpdateQuantity: 0
    }

    this.updateFoodItemQuantity = this.updateFoodItemQuantity.bind(this)
  }

  static contextType = UserContext

  setModalVisible(value) {
    this.setState({ modalVisible: value })
  }

  componentDidMount() {
    this.getFoodItems()
  }

  updateFoodItemQuantity(index, key, price, title, quantity) {

    var _this = this;
    const { isLoggedIn, setCartData, setCartTotal, cartData } = this.context
    var currentChecked = this.state.checked
    currentChecked[key] = quantity
    this.setState({ checked: currentChecked })
    
    let cartItems = cartData

    this.setState({ itemToUpdate: index })
    this.setState({ itemToUpdateTitle: title })
    this.setState({ itemToUpdateQuantity: quantity })

    // console.log('cart', cartItems);

    // if the food item doesn't equal pizza, don't show any condiments options
    let itemsThatNeedOptions = [
      "Hamburger",
      "Cheeseburger",
      "Chicken Sandwich",
      "Thick Fried Bologna Burger",
      "Hotdog (100% Beef)",
      "Corndog",
      "BBQ Sandwich",
      "Chicken Tenders (4 piece)",
      "Chicken Wings (5 piece)",
      "Mozzerella Cheese Sticks",
      "Fried Pickles",
      "French Fries",
      "Onion Rings",
      "Small Popcorn",
      "Large Popcorn",
      "Nachos w/cheese",
      "Small Drink 12 oz",
      "Large Drink 20 oz",
      "Souvenir Cup 44 oz",
      "Souvenir Cup Refill",
    ]

    if(itemsThatNeedOptions.includes(title) && quantity !== 0) {
      this.setModalVisible(true)
    }

    console.log(cartItems);

    let cart = {
      key: key,
      price: price,
      title: title,
      quantity: quantity,
      condiments: []
    }

    if(typeof cartItems[index] === "undefined") {
      cartItems[index] = cart;
    }
    else {
      cartItems[index].key = key;
      cartItems[index].price = price;
      cartItems[index].title = title;
      cartItems[index].quantity = quantity;
    }
    
    setCartData(cartItems)
	}

  getFoodItems() {
    const { setPublicFoodItems } = this.context
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        setPublicFoodItems(response)
        
      }
    }

    var theUrl = "http://bluechipadvertising.com/getFoodItemsPublic.php"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ action: "get-items" }))
  }

  /*
  The purpose of this method is to add condiments for food items when adding items to a cart
  */
  updateFoodItem(item, which) {
    const { isLoggedIn, setCartData, setCartTotal, cartData } = this.context
    var prevCart = cartData[this.state.itemToUpdate]
    var originalItem = item;
    item = item + '-' + which;

    // check if the item is already added to the cart
    var index = prevCart.condiments.indexOf(item)
    var itemIndex = this.state.itemToUpdate;
 
    switch(originalItem) {
      case 'lettuce' :
        var current = this.state.lettuceChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ lettuceChecked: current })
      break
      case 'tomato' :
        var current = this.state.tomatoChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ tomatoChecked: current })
      break
      case 'pickles' :
        var current = this.state.picklesChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ picklesChecked: current })
      break
      case 'onion' :
        var current = this.state.onionChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ onionChecked: current })
      break
      case 'chili' :
        var current = this.state.chiliChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ chiliChecked: current })
      break
      case 'slaw' :
        var current = this.state.slawChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ slawChecked: current })
      break
      case 'cheese' :
        var current = this.state.cheeseChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cheeseChecked: current })
      break
      case 'jalapenos' :
        var current = this.state.jalapenosChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ jalapenosChecked: current })
      break
      case 'ketchup' :
        var current = this.state.ketchupChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ ketchupChecked: current })
      break
      case 'mustard' :
        var current = this.state.mustardChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ mustardChecked: current })
      break
      case 'ranch' :
        var current = this.state.ranchChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ ranchChecked: current })
      break
      case 'honeymustard' :
        var current = this.state.honeyMustardChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ honeyMustardChecked: current })
      break
      case 'bbq' :
        var current = this.state.bbqChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ bbqChecked: current })
      break
      case 'butter' :
        var current = this.state.butterChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ butterChecked: current })
      break
      case 'coke' :
        var current = this.state.cokeChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cokeChecked: current })
      break
      case 'cokeZero' :
        var current = this.state.cokeZeroChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cokeZeroChecked: current })
      break
      case 'sprite' :
        var current = this.state.spriteChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ spriteChecked: current })
      break
      case 'sundrop' :
        var current = this.state.sundropChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ sundropChecked: current })
      break
      case 'cherrylemonsundrop' :
        var current = this.state.cherryLemonSundropChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cherryLemonSundropChecked: current })
      break
      case 'cherryfanta' :
        var current = this.state.cherryFantaChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cherryFantaChecked: current })
      break
      case 'drpepper' :
        var current = this.state.drPepperChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ drPepperChecked: current })
      break
      case 'goldpeaktea' :
        var current = this.state.goldPeakTeaChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ goldPeakTeaChecked: current })
      break
      case 'countrytimelemonade' :
        var current = this.state.countryTimeLemonadeChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ countryTimeLemonadeChecked: current })
      break
    }

    if(index === -1) {
      prevCart.condiments.push(item)
    }
    else {
      prevCart.condiments.splice(index, 1)
    }
    
    let finalCart = cartData;
    finalCart[this.state.itemToUpdate] = prevCart;

    setCartData(finalCart)
  }

  

  buildItems() {
    const { publicFoodItems } = this.context
    // console.log(publicFoodItems);
    const state = this.state
    const foodItemDropdown = (key, index, price, title) => (
      <>
        <Picker
          style={RaptorFormStyles.onePicker} itemStyle={RaptorFormStyles.onePickerItem}
          selectedValue={this.state.checked[key]}
          style={RaptorFormStyles.picker}
          onValueChange={(quantity) => this.updateFoodItemQuantity(index, key, price, title, quantity)}
        >
          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>
      </>
    )

    const wrapper = (data) => {
      return <Text style={RaptorFormStyles.cell}>{data}</Text>
    }

    const displayCondiment = (title, value, label, ckey) => {
      return <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>{title}</Text>
        <CheckBox
          value={value}
          onValueChange={() => this.updateFoodItem(label, ckey)}
          style={styles.checkbox}
        />
      </View>
    }

    let foodOptions = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[10], 'lettuce', 0)}
        {displayCondiment('Tomato', this.state.tomatoChecked[10], 'tomato', 0)}
        {displayCondiment('Pickles', this.state.picklesChecked[10], 'pickles', 0)}
        {displayCondiment('Onion', this.state.onionChecked[10], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[10], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[10], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[10], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[10], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[10], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[10], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[10], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[10], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[10], 'bbq', 0)}
        </>
      break;
      case 'Cheeseburger' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[20], 'lettuce', 0)}
        {displayCondiment('Tomato', this.state.tomatoChecked[20], 'tomato', 0)}
        {displayCondiment('Pickles', this.state.picklesChecked[20], 'pickles', 0)}
        {displayCondiment('Onion', this.state.onionChecked[20], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[20], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[20], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[20], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[20], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[20], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[20], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[20], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[20], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[20], 'bbq', 0)}
        </>
      break;
      case 'Chicken Sandwich' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[50], 'lettuce', 0)}
        {displayCondiment('Tomato', this.state.tomatoChecked[50], 'tomato', 0)}
        {displayCondiment('Pickles', this.state.picklesChecked[50], 'pickles', 0)}
        {displayCondiment('Onion', this.state.onionChecked[50], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[50], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[50], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[50], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[50], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[50], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[50], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[50], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[50], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[50], 'bbq', 0)}
        </>
      break;
      case 'Thick Fried Bologna Burger' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[60], 'lettuce', 0)}
        {displayCondiment('Tomato', this.state.tomatoChecked[60], 'tomato', 0)}
        {displayCondiment('Pickles', this.state.picklesChecked[60], 'pickles', 0)}
        {displayCondiment('Onion', this.state.onionChecked[60], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[60], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[60], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[60], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[60], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[60], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[60], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[60], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[60], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[60], 'bbq', 0)}
        </>
      break;
      case 'Hotdog (100% Beef)' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[30], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[30], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[30], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[30], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[30], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[30], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[30], 'mustard', 0)}
        </>
      break;
      case 'Corndog' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[40], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[40], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[40], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[40], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[40], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[40], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[40], 'mustard', 0)}
        </>
      break;
      case 'BBQ Sandwich' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pickles', this.state.picklesChecked[70], 'pickles', 0)}
        {displayCondiment('Onion', this.state.onionChecked[70], 'onion', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[70], 'slaw', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[70], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[70], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[70], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[70], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[70], 'honeymustard', 0)}
        </>
      break;
      case 'Chicken Tenders (4 piece)' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[80], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[80], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[80], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[80], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[80], 'bbq', 0)}
        </>
      break;
      case 'Chicken Wings (5 piece)' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[90], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[90], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[90], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[90], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[90], 'bbq', 0)}
        </>
      break;
      case 'Mozzerella Cheese Sticks' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[100], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[100], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[100], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[100], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[100], 'bbq', 0)}
        </>
      break;
      case 'Fried Pickles' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[110], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[110], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[110], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[110], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[110], 'bbq', 0)}
        </>
      break;
      case 'French Fries' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[120], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[120], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[120], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[120], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[120], 'bbq', 0)}
        </>
      break;
      case 'Onion Rings' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[130], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[130], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[130], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[130], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[130], 'bbq', 0)}
        </>
      break;
      case 'Small Popcorn' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[160], 'butter', 0)}
        </>
      break;
      case 'Large Popcorn' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[170], 'butter', 0)}
        </>
      break;
      case 'Nachos w/cheese' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Chili', this.state.chiliChecked[180], 'chili', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[180], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[180], 'jalapenos', 0)}
        </>
      break;
      case 'Small Drink 12 oz' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[310], 'coke', 0)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[310], 'cokeZero', 0)}
        {displayCondiment('Sprite', this.state.spriteChecked[310], 'sprite', 0)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[310], 'sundrop', 0)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[310], 'cherryLemonSundrop', 0)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[310], 'cherryFanta', 0)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[310], 'drPepper', 0)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[310], 'goldPeakTea', 0)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[310], 'countryTimeLemonade', 0)}
        </>
      break;
      case 'Large Drink 20 oz' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[320], 'coke', 0)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[320], 'cokeZero', 0)}
        {displayCondiment('Sprite', this.state.spriteChecked[320], 'sprite', 0)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[320], 'sundrop', 0)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[320], 'cherryLemonSundrop', 0)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[320], 'cherryFanta', 0)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[320], 'drPepper', 0)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[320], 'goldPeakTea', 0)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[320], 'countryTimeLemonade', 0)}
        </>
      break;
      case 'Souvenir Cup 44 oz' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[330], 'coke', 0)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[330], 'cokeZero', 0)}
        {displayCondiment('Sprite', this.state.spriteChecked[330], 'sprite', 0)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[330], 'sundrop', 0)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[330], 'cherryLemonSundrop', 0)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[330], 'cherryFanta', 0)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[330], 'drPepper', 0)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[330], 'goldPeakTea', 0)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[330], 'countryTimeLemonade', 0)}
        </>
      break;
      case 'Souvenir Cup Refill' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[340], 'coke', 0)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[340], 'cokeZero', 0)}
        {displayCondiment('Sprite', this.state.spriteChecked[340], 'sprite', 0)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[340], 'sundrop', 0)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[340], 'cherryLemonSundrop', 0)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[340], 'cherryFanta', 0)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[340], 'drPepper', 0)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[340], 'goldPeakTea', 0)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[340], 'countryTimeLemonade', 0)}
        </>
      break;

    }

    let foodOptions2 = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[11], 'lettuce', 1)}
        {displayCondiment('Tomato', this.state.tomatoChecked[11], 'tomato', 1)}
        {displayCondiment('Pickles', this.state.picklesChecked[11], 'pickles', 1)}
        {displayCondiment('Onion', this.state.onionChecked[11], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[11], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[11], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[11], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[11], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[11], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[11], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[11], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[11], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[11], 'bbq', 1)}
        </>
      break;
      case 'Cheeseburger' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[21], 'lettuce', 1)}
        {displayCondiment('Tomato', this.state.tomatoChecked[21], 'tomato', 1)}
        {displayCondiment('Pickles', this.state.picklesChecked[21], 'pickles', 1)}
        {displayCondiment('Onion', this.state.onionChecked[21], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[21], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[21], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[21], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[21], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[21], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[21], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[21], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[21], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[21], 'bbq', 1)}
        </>
      break;
      case 'Chicken Sandwich' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[51], 'lettuce', 1)}
        {displayCondiment('Tomato', this.state.tomatoChecked[51], 'tomato', 1)}
        {displayCondiment('Pickles', this.state.picklesChecked[51], 'pickles', 1)}
        {displayCondiment('Onion', this.state.onionChecked[51], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[51], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[51], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[51], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[51], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[51], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[51], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[51], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[51], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[51], 'bbq', 1)}
        </>
      break;
      case 'Thick Fried Bologna Burger' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[61], 'lettuce', 1)}
        {displayCondiment('Tomato', this.state.tomatoChecked[61], 'tomato', 1)}
        {displayCondiment('Pickles', this.state.picklesChecked[61], 'pickles', 1)}
        {displayCondiment('Onion', this.state.onionChecked[61], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[61], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[61], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[61], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[61], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[61], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[61], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[61], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[61], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[61], 'bbq', 1)}
        </>
      break;
      case 'Hotdog (100% Beef)' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[31], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[31], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[31], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[31], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[31], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[31], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[31], 'mustard', 1)}
        </>
      break;
      case 'Corndog' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[41], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[41], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[41], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[41], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[41], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[41], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[41], 'mustard', 1)}
        </>
      break;
      case 'BBQ Sandwich' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pickles', this.state.picklesChecked[71], 'pickles', 1)}
        {displayCondiment('Onion', this.state.onionChecked[71], 'onion', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[71], 'slaw', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[71], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[71], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[71], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[71], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[71], 'honeymustard', 1)}
        </>
      break;
      case 'Chicken Tenders (4 piece)' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[81], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[81], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[81], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[81], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[81], 'bbq', 1)}
        </>
      break;
      case 'Chicken Wings (5 piece)' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[91], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[91], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[91], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[91], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[91], 'bbq', 1)}
        </>
      break;
      case 'Mozzerella Cheese Sticks' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[101], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[101], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[101], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[101], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[101], 'bbq', 1)}
        </>
      break;
      case 'Fried Pickles' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[111], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[111], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[111], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[111], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[111], 'bbq', 1)}
        </>
      break;
      case 'French Fries' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[121], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[121], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[121], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[121], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[121], 'bbq', 1)}
        </>
      break;
      case 'Onion Rings' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[131], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[131], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[131], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[131], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[131], 'bbq', 1)}
        </>
      break;
      case 'Small Popcorn' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[161], 'butter', 1)}
        </>
      break;
      case 'Large Popcorn' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[171], 'butter', 1)}
        </>
      break;
      case 'Nachos w/cheese' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Chili', this.state.chiliChecked[181], 'chili', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[181], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[181], 'jalapenos', 1)}
        </>
      break;
      case 'Small Drink 12 oz' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[311], 'coke', 1)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[311], 'cokeZero', 1)}
        {displayCondiment('Sprite', this.state.spriteChecked[311], 'sprite', 1)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[311], 'sundrop', 1)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[311], 'cherryLemonSundrop', 1)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[311], 'cherryFanta', 1)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[311], 'drPepper', 1)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[311], 'goldPeakTea', 1)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[311], 'countryTimeLemonade', 1)}
        </>
      break;
      case 'Large Drink 20 oz' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[321], 'coke', 1)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[321], 'cokeZero', 1)}
        {displayCondiment('Sprite', this.state.spriteChecked[321], 'sprite', 1)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[321], 'sundrop', 1)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[321], 'cherryLemonSundrop', 1)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[321], 'cherryFanta', 1)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[321], 'drPepper', 1)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[321], 'goldPeakTea', 1)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[321], 'countryTimeLemonade', 1)}
        </>
      break;
      case 'Souvenir Cup 44 oz' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[331], 'coke', 1)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[331], 'cokeZero', 1)}
        {displayCondiment('Sprite', this.state.spriteChecked[331], 'sprite', 1)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[331], 'sundrop', 1)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[331], 'cherryLemonSundrop', 1)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[331], 'cherryFanta', 1)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[331], 'drPepper', 1)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[331], 'goldPeakTea', 1)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[331], 'countryTimeLemonade', 1)}
        </>
      break;
      case 'Souvenir Cup Refill' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[341], 'coke', 1)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[341], 'cokeZero', 1)}
        {displayCondiment('Sprite', this.state.spriteChecked[341], 'sprite', 1)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[341], 'sundrop', 1)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[341], 'cherryLemonSundrop', 1)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[341], 'cherryFanta', 1)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[341], 'drPepper', 1)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[341], 'goldPeakTea', 1)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[341], 'countryTimeLemonade', 1)}
        </>
      break;

    }
    let foodOptions3 = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[12], 'lettuce', 2)}
        {displayCondiment('Tomato', this.state.tomatoChecked[12], 'tomato', 2)}
        {displayCondiment('Pickles', this.state.picklesChecked[12], 'pickles', 2)}
        {displayCondiment('Onion', this.state.onionChecked[12], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[12], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[12], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[12], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[12], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[12], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[12], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[12], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[12], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[12], 'bbq', 2)}
        </>
      break;
      case 'Cheeseburger' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[22], 'lettuce', 2)}
        {displayCondiment('Tomato', this.state.tomatoChecked[22], 'tomato', 2)}
        {displayCondiment('Pickles', this.state.picklesChecked[22], 'pickles', 2)}
        {displayCondiment('Onion', this.state.onionChecked[22], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[22], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[22], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[22], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[22], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[22], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[22], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[22], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[22], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[22], 'bbq', 2)}
        </>
      break;
      case 'Chicken Sandwich' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[52], 'lettuce', 2)}
        {displayCondiment('Tomato', this.state.tomatoChecked[52], 'tomato', 2)}
        {displayCondiment('Pickles', this.state.picklesChecked[52], 'pickles', 2)}
        {displayCondiment('Onion', this.state.onionChecked[52], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[52], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[52], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[52], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[52], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[52], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[52], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[52], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[52], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[52], 'bbq', 2)}
        </>
      break;
      case 'Thick Fried Bologna Burger' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[62], 'lettuce', 2)}
        {displayCondiment('Tomato', this.state.tomatoChecked[62], 'tomato', 2)}
        {displayCondiment('Pickles', this.state.picklesChecked[62], 'pickles', 2)}
        {displayCondiment('Onion', this.state.onionChecked[62], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[62], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[62], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[62], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[62], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[62], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[62], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[62], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[62], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[62], 'bbq', 2)}
        </>
      break;
      case 'Hotdog (100% Beef)' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[32], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[32], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[32], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[32], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[32], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[32], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[32], 'mustard', 2)}
        </>
      break;
      case 'Corndog' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[42], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[42], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[42], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[42], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[42], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[42], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[42], 'mustard', 2)}
        </>
      break;
      case 'BBQ Sandwich' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pickles', this.state.picklesChecked[72], 'pickles', 2)}
        {displayCondiment('Onion', this.state.onionChecked[72], 'onion', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[72], 'slaw', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[72], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[72], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[72], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[72], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[72], 'honeymustard', 2)}
        </>
      break;
      case 'Chicken Tenders (4 piece)' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[82], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[82], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[82], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[82], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[82], 'bbq', 2)}
        </>
      break;
      case 'Chicken Wings (5 piece)' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[92], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[92], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[92], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[92], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[92], 'bbq', 2)}
        </>
      break;
      case 'Mozzerella Cheese Sticks' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[102], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[102], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[102], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[102], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[102], 'bbq', 2)}
        </>
      break;
      case 'Fried Pickles' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[112], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[112], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[112], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[112], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[112], 'bbq', 2)}
        </>
      break;
      case 'French Fries' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[122], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[122], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[122], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[122], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[122], 'bbq', 2)}
        </>
      break;
      case 'Onion Rings' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[132], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[132], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[132], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[132], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[132], 'bbq', 2)}
        </>
      break;
      case 'Small Popcorn' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[162], 'butter', 2)}
        </>
      break;
      case 'Large Popcorn' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[172], 'butter', 2)}
        </>
      break;
      case 'Nachos w/cheese' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Chili', this.state.chiliChecked[182], 'chili', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[182], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[182], 'jalapenos', 2)}
        </>
      break;
      case 'Small Drink 12 oz' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[312], 'coke', 2)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[312], 'cokeZero', 2)}
        {displayCondiment('Sprite', this.state.spriteChecked[312], 'sprite', 2)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[312], 'sundrop', 2)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[312], 'cherryLemonSundrop', 2)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[312], 'cherryFanta', 2)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[312], 'drPepper', 2)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[312], 'goldPeakTea', 2)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[312], 'countryTimeLemonade', 2)}
        </>
      break;
      case 'Large Drink 20 oz' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[322], 'coke', 2)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[322], 'cokeZero', 2)}
        {displayCondiment('Sprite', this.state.spriteChecked[322], 'sprite', 2)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[322], 'sundrop', 2)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[322], 'cherryLemonSundrop', 2)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[322], 'cherryFanta', 2)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[322], 'drPepper', 2)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[322], 'goldPeakTea', 2)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[322], 'countryTimeLemonade', 2)}
        </>
      break;
      case 'Souvenir Cup 44 oz' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[332], 'coke', 2)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[332], 'cokeZero', 2)}
        {displayCondiment('Sprite', this.state.spriteChecked[332], 'sprite', 2)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[332], 'sundrop', 2)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[332], 'cherryLemonSundrop', 2)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[332], 'cherryFanta', 2)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[332], 'drPepper', 2)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[332], 'goldPeakTea', 2)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[332], 'countryTimeLemonade', 2)}
        </>
      break;
      case 'Souvenir Cup Refill' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[342], 'coke', 2)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[342], 'cokeZero', 2)}
        {displayCondiment('Sprite', this.state.spriteChecked[342], 'sprite', 2)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[342], 'sundrop', 2)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[342], 'cherryLemonSundrop', 2)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[342], 'cherryFanta', 2)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[342], 'drPepper', 2)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[342], 'goldPeakTea', 2)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[342], 'countryTimeLemonade', 2)}
        </>
      break;

    }

    let foodHeading = <Text style={{ color: '#111', fontSize: 18 }}>{this.state.itemToUpdateTitle}</Text>

    let foodOptionsMarkup = <><View style={styles.foodHeading}>{foodHeading}</View>{foodOptions}</>
    if(this.state.itemToUpdateQuantity >= 2) {
      foodOptionsMarkup = <>{foodOptionsMarkup}<View style={styles.foodHeading}>{foodHeading}<Text style={{ color: '#111', fontSize: 18 }}> #2</Text></View>{foodOptions2}</>
    }
    if(this.state.itemToUpdateQuantity >= 3) {
      foodOptionsMarkup = <>{foodOptionsMarkup}<View style={styles.foodHeading}>{foodHeading}<Text style={{ color: '#111', fontSize: 18 }}> #3</Text></View>{foodOptions3}</>
    }

    return (
      <View style={RaptorFormStyles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.foodOptionContainer}>
            {foodOptionsMarkup}
          </ScrollView>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}
          >
            <Text style={styles.modalButton}>CLOSE OPTIONS</Text>
          </TouchableHighlight>
        </View>
      </Modal>
        <View style={RaptorFormStyles.heading}><Text style={RaptorFormStyles.headingText}>FROM THE GRILL</Text></View>
        <Table style={{ marginBottom: 24 }}>
          <Row data={this.props.tableHead} style={RaptorFormStyles.tableHeading} textStyle={RaptorFormStyles.rowTextStyle}/>
          {
            publicFoodItems[0].map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={RaptorFormStyles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? foodItemDropdown(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        <View style={RaptorFormStyles.heading}><Text style={RaptorFormStyles.headingText}>SNACKS</Text></View>
         <Table style={{ marginBottom: 24 }}>
          <Row data={this.props.tableHead} style={RaptorFormStyles.tableHeading} textStyle={RaptorFormStyles.rowTextStyle}/>
          {
            publicFoodItems[1].map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={RaptorFormStyles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? foodItemDropdown(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        <View style={RaptorFormStyles.heading}><Text style={RaptorFormStyles.headingText}>BEVERAGES</Text></View>
         <Table style={{ marginBottom: 24 }}>
          <Row data={this.props.tableHead} style={RaptorFormStyles.tableHeading} textStyle={RaptorFormStyles.rowTextStyle}/>
          {
            publicFoodItems[2].map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={RaptorFormStyles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? foodItemDropdown(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        <View style={RaptorFormStyles.heading}><Text style={RaptorFormStyles.headingText}>MISCELLANEIOUS</Text></View>
         <Table style={{ marginBottom: 24 }}>
          <Row data={this.props.tableHead} style={RaptorFormStyles.tableHeading} textStyle={RaptorFormStyles.rowTextStyle}/>
          {
            publicFoodItems[3].map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={RaptorFormStyles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? foodItemDropdown(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  }

  render() {
    return (
      <>
        {this.buildItems()}
      </>
    )
  }
}

const styles = StyleSheet.create({
  foodOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5
  },
  foodHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#DDD',
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 8
  },
  modalButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  foodOptionContainer: { 
    backgroundColor: 'white', 
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 16,
    paddingBottom: 16
  },
  foodOptionHeading: {
    backgroundColor: "#cb4a4a",
    padding: 6
  },
  foodOptionHeadingText: {
    color: "white"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  checkbox: {
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 30
  },
  innerContainer: {
    alignItems: 'center',
    padding: 40
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 12
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

const RaptorFormStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 22,
    borderWidth: 1,
    borderColor: "#CCC"
  },
  buttonText: {
    color: "white",
  },
  onePicker: {
    width: 100,
    height: 44,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  onePickerItem: {
    height: 44,
    color: 'red'
  },
  cell: {
    paddingRight: 24
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  heading: {
    backgroundColor: colors.primary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18
  },
  headingText: {
    color: "white",
    fontFamily: "poppins-normal"
  },
  rowTextStyle: {
    fontSize: 17
  },
  tableHeading: {
    backgroundColor: "#EEE",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 18
  }, 
  tableWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 18
  },
  text: {
    fontSize: 17
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 10,
    width: "80%",
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 17,
    width: 60,
    borderWidth: 1,
    borderColor: "#CCC"
  },
  textInputWrap: {
    backgroundColor: "white",
    width: 35
  }, 
  tableWrap: {
    marginTop: 24
  },
  submitButton: {
    marginTop: 24
  }
})

