import React, { Component, useState } from 'react'
import { StyleSheet, View, ScrollView, Text, TextInput, Button, TouchableOpacity, TouchableHighlight, AsyncStorage, Modal, Alert } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import Picker from '@react-native-community/picker'
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
      mayoChecked: [],
      powderedChecked: [],
      cinnamonSugarChecked: [],
      chocolateSyrupChecked: [],
      strawberrySyrupChecked: [],
      chocolateChipChecked: [],
      oatmealRaisinChecked: [],
      peanutButterChecked: [],
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
      "Mozzarella Cheese Sticks",
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
      "Funnel Cake",
      "Homemade Cookies"
    ]

    if(itemsThatNeedOptions.includes(title) && quantity != 0) {
      this.setModalVisible(true)
    }

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
      if(quantity == 0) {
        cartItems[index].condiments = [];
        _this.emptyCondimentsByIndex(index);
      }
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

    var theUrl = "http://bluechipadvertising.com/getFoodItemsPublic.php?site_id=1"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ action: "get-items" }))
  }

  emptyCondimentsByIndex(index) {
      // lettuce
      var current = this.state.lettuceChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ lettuceChecked: current })

      // tomato
      var current = this.state.tomatoChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ tomatoChecked: current })
      
      // pickles
      var current = this.state.picklesChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ picklesChecked: current })

      // onion
      var current = this.state.onionChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ onionChecked: current })

      // chili
      var current = this.state.chiliChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ chiliChecked: current })

      // slaw
      var current = this.state.slawChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ slawChecked: current })
      
      // cheese
      var current = this.state.cheeseChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cheeseChecked: current })
      
      // jalapenos
      var current = this.state.jalapenosChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ jalapenosChecked: current })
      
      // ketchup
      var current = this.state.ketchupChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ ketchupChecked: current })
      
      // mustard
      var current = this.state.mustardChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ mustardChecked: current })
      
      // ranch
      var current = this.state.ranchChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ ranchChecked: current })
      
      // honey mustard
      var current = this.state.honeyMustardChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ honeyMustardChecked: current })
      
      // butter
      var current = this.state.butterChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ butterChecked: current })
      
      // BBQ
      var current = this.state.bbqChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ bbqChecked: current })
      
      // mayo
      var current = this.state.mayoChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ mayoChecked: current })
      
      // powdered sugar
      var current = this.state.powderedChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ powderedChecked: current })
      
      // cinnamon sugar
      var current = this.state.cinnamonSugarChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cinnamonSugarChecked: current })
      
      // chocolate syrup
      var current = this.state.chocolateSyrupChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ chocolateSyrupChecked: current })
      
      // strawberry syrup
      var current = this.state.strawberrySyrupChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ strawberrySyrupChecked: current })
      
      // chocolate chip
      var current = this.state.chocolateChipChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ chocolateChipChecked: current })
      
      // oatmeal raisin
      var current = this.state.oatmealRaisinChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ oatmealRaisinChecked: current })
      
      // peanut butter
      var current = this.state.peanutButterChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ peanutButterChecked: current })
      
      // coke
      var current = this.state.cokeChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cokeChecked: current })
      
      // coke zero
      var current = this.state.cokeZeroChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cokeZeroChecked: current })
      
      // sprite
      var current = this.state.spriteChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ spriteChecked: current })
      
      // sun drop
      var current = this.state.sundropChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ sundropChecked: current })
      
      // cherry lemon sun drop
      var current = this.state.cherryLemonSundropChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cherryLemonSundropChecked: current })
      
      // cherry fanta
      var current = this.state.cherryFantaChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cherryFantaChecked: current })
      
      // dr pepper
      var current = this.state.drPepperChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ drPepperChecked: current })
      
      // gold peak tea
      var current = this.state.goldPeakTeaChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ goldPeakTeaChecked: current })
      
      // country time lemonade
      var current = this.state.countryTimeLemonadeChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ countryTimeLemonadeChecked: current })
      
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
      case 'mayo' :
        var current = this.state.mayoChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ mayoChecked: current })
      break
      case 'powdered' :
        var current = this.state.powderedChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ powderedChecked: current })
      break
      case 'cinnamonSugar' :
        var current = this.state.cinnamonSugarChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cinnamonSugarChecked: current })
      break
      case 'chocolateSyrup' :
        var current = this.state.chocolateSyrupChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ chocolateSyrupChecked: current })
      break
      case 'strawberrySyrup' :
        var current = this.state.strawberrySyrupChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ strawberrySyrupChecked: current })
      break
      case 'chocolateChip' :
        var current = this.state.chocolateChipChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ chocolateChipChecked: current })
      break
      case 'oatmealRaisin' :
        var current = this.state.oatmealRaisinChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ oatmealRaisinChecked: current })
      break
      case 'peanutButter' :
        var current = this.state.peanutButterChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ peanutButterChecked: current })
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

    var itemIndex = this.state.itemToUpdate;

    let foodOptions = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+0], 'lettuce', 0)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+0], 'tomato', 0)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+0], 'pickles', 0)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+0], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+0], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+0], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+0], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+0], 'mayo', 0)}
        </>
      break;
      case 'Cheeseburger' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+0], 'lettuce', 0)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+0], 'tomato', 0)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+0], 'pickles', 0)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+0], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+0], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+0], 'slaw', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+0], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+0], 'mayo', 0)}
        </>
      break;
      case 'Chicken Sandwich' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+0], 'lettuce', 0)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+0], 'tomato', 0)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+0], 'pickles', 0)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+0], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+0], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+0], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+0], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+0], 'mayo', 0)}
        </>
      break;
      case 'Thick Fried Bologna Burger' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+0], 'lettuce', 0)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+0], 'tomato', 0)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+0], 'pickles', 0)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+0], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+0], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+0], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+0], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+0], 'mayo', 0)}
        </>
      break;
      case 'Hotdog (100% Beef)' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+0], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+0], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+0], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+0], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        </>
      break;
      case 'Corndog' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+0], 'onion', 0)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+0], 'chili', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+0], 'slaw', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+0], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        </>
      break;
      case 'BBQ Sandwich' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+0], 'pickles', 0)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+0], 'onion', 0)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+0], 'slaw', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+0], 'jalapenos', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        </>
      break;
      case 'Chicken Tenders (4 piece)' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        </>
      break;
      case 'Chicken Wings (5 piece)' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        </>
      break;
      case 'Mozzarella Cheese Sticks' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        </>
      break;
      case 'Fried Pickles' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        </>
      break;
      case 'French Fries' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        </>
      break;
      case 'Onion Rings' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        </>
      break;
      case 'Small Popcorn' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[itemIndex+0], 'butter', 0)}
        </>
      break;
      case 'Large Popcorn' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[itemIndex+0], 'butter', 0)}
        </>
      break;
      case 'Nachos w/cheese' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+0], 'chili', 0)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+0], 'jalapenos', 0)}
        </>
      break;
      case 'Small Drink 12 oz' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+0], 'coke', 0)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+0], 'cokeZero', 0)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+0], 'sprite', 0)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+0], 'sundrop', 0)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+0], 'cherryLemonSundrop', 0)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+0], 'cherryFanta', 0)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+0], 'drPepper', 0)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+0], 'goldPeakTea', 0)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+0], 'countryTimeLemonade', 0)}
        </>
      break;
      case 'Large Drink 20 oz' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+0], 'coke', 0)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+0], 'cokeZero', 0)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+0], 'sprite', 0)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+0], 'sundrop', 0)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+0], 'cherryLemonSundrop', 0)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+0], 'cherryFanta', 0)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+0], 'drPepper', 0)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+0], 'goldPeakTea', 0)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+0], 'countryTimeLemonade', 0)}
        </>
      break;
      case 'Souvenir Cup 44 oz' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+0], 'coke', 0)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+0], 'cokeZero', 0)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+0], 'sprite', 0)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+0], 'sundrop', 0)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+0], 'cherryLemonSundrop', 0)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+0], 'cherryFanta', 0)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+0], 'drPepper', 0)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+0], 'goldPeakTea', 0)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+0], 'countryTimeLemonade', 0)}
        </>
      break;
      case 'Souvenir Cup Refill' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+0], 'coke', 0)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+0], 'cokeZero', 0)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+0], 'sprite', 0)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+0], 'sundrop', 0)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+0], 'cherryLemonSundrop', 0)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+0], 'cherryFanta', 0)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+0], 'drPepper', 0)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+0], 'goldPeakTea', 0)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+0], 'countryTimeLemonade', 0)}
        </>
      break;
      case 'Funnel Cake' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Powdered', this.state.powderedChecked[itemIndex+0], 'powdered', 0)}
        {displayCondiment('Cinnamon Sugar', this.state.cinnamonSugarChecked[itemIndex+0], 'cinnamonSugar', 0)}
        {displayCondiment('Chocolate Syrup', this.state.chocolateSyrupChecked[itemIndex+0], 'chocolateSyrup', 0)}
        {displayCondiment('Strawberry Syrup', this.state.strawberrySyrupChecked[itemIndex+0], 'strawberrySyrup', 0)}
        </>
      break;
      case 'Homemade Cookies' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Chocolate Chip', this.state.chocolateChipChecked[itemIndex+0], 'chocolateChip', 0)}
        {displayCondiment('Oatmeal Raisin', this.state.oatmealRaisinChecked[itemIndex+0], 'oatmealRaisin', 0)}
        {displayCondiment('Peanut Butter', this.state.peanutButterChecked[itemIndex+0], 'peanutButter', 0)}
        </>
      break;

    }

    let foodOptions2 = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+1], 'lettuce', 1)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+1], 'tomato', 1)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+1], 'pickles', 1)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+1], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+1], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+1], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+1], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+1], 'mayo', 1)}
        </>
      break;
      case 'Cheeseburger' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+1], 'lettuce', 1)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+1], 'tomato', 1)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+1], 'pickles', 1)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+1], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+1], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+1], 'slaw', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+1], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+1], 'mayo', 1)}
        </>
      break;
      case 'Chicken Sandwich' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+1], 'lettuce', 1)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+1], 'tomato', 1)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+1], 'pickles', 1)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+1], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+1], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+1], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+1], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+1], 'mayo', 1)}
        </>
      break;
      case 'Thick Fried Bologna Burger' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+1], 'lettuce', 1)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+1], 'tomato', 1)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+1], 'pickles', 1)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+1], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+1], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+1], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+1], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+1], 'mayo', 1)}
        </>
      break;
      case 'Hotdog (100% Beef)' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+1], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+1], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+1], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+1], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        </>
      break;
      case 'Corndog' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+1], 'onion', 1)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+1], 'chili', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+1], 'slaw', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+1], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        </>
      break;
      case 'BBQ Sandwich' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+1], 'pickles', 1)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+1], 'onion', 1)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+1], 'slaw', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+1], 'jalapenos', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        </>
      break;
      case 'Chicken Tenders (4 piece)' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        </>
      break;
      case 'Chicken Wings (5 piece)' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        </>
      break;
      case 'Mozzarella Cheese Sticks' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        </>
      break;
      case 'Fried Pickles' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        </>
      break;
      case 'French Fries' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        </>
      break;
      case 'Onion Rings' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        </>
      break;
      case 'Small Popcorn' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[itemIndex+1], 'butter', 1)}
        </>
      break;
      case 'Large Popcorn' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[itemIndex+1], 'butter', 1)}
        </>
      break;
      case 'Nachos w/cheese' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+1], 'chili', 1)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+1], 'jalapenos', 1)}
        </>
      break;
      case 'Small Drink 12 oz' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+1], 'coke', 1)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+1], 'cokeZero', 1)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+1], 'sprite', 1)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+1], 'sundrop', 1)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+1], 'cherryLemonSundrop', 1)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+1], 'cherryFanta', 1)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+1], 'drPepper', 1)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+1], 'goldPeakTea', 1)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+1], 'countryTimeLemonade', 1)}
        </>
      break;
      case 'Large Drink 20 oz' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+1], 'coke', 1)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+1], 'cokeZero', 1)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+1], 'sprite', 1)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+1], 'sundrop', 1)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+1], 'cherryLemonSundrop', 1)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+1], 'cherryFanta', 1)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+1], 'drPepper', 1)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+1], 'goldPeakTea', 1)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+1], 'countryTimeLemonade', 1)}
        </>
      break;
      case 'Souvenir Cup 44 oz' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+1], 'coke', 1)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+1], 'cokeZero', 1)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+1], 'sprite', 1)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+1], 'sundrop', 1)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+1], 'cherryLemonSundrop', 1)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+1], 'cherryFanta', 1)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+1], 'drPepper', 1)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+1], 'goldPeakTea', 1)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+1], 'countryTimeLemonade', 1)}
        </>
      break;
      case 'Souvenir Cup Refill' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+1], 'coke', 1)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+1], 'cokeZero', 1)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+1], 'sprite', 1)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+1], 'sundrop', 1)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+1], 'cherryLemonSundrop', 1)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+1], 'cherryFanta', 1)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+1], 'drPepper', 1)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+1], 'goldPeakTea', 1)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+1], 'countryTimeLemonade', 1)}
        </>
      break;
      case 'Funnel Cake' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Powdered', this.state.powderedChecked[itemIndex+1], 'powdered', 1)}
        {displayCondiment('Cinnamon Sugar', this.state.cinnamonSugarChecked[itemIndex+1], 'cinnamonSugar', 1)}
        {displayCondiment('Chocolate Syrup', this.state.chocolateSyrupChecked[itemIndex+1], 'chocolateSyrup', 1)}
        {displayCondiment('Strawberry Syrup', this.state.strawberrySyrupChecked[itemIndex+1], 'strawberrySyrup', 1)}
        </>
      break;
      case 'Homemade Cookies' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Chocolate Chip', this.state.chocolateChipChecked[itemIndex+1], 'chocolateChip', 1)}
        {displayCondiment('Oatmeal Raisin', this.state.oatmealRaisinChecked[itemIndex+1], 'oatmealRaisin', 1)}
        {displayCondiment('Peanut Butter', this.state.peanutButterChecked[itemIndex+1], 'peanutButter', 1)}
        </>
      break;

    }
    let foodOptions3 = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+2], 'lettuce', 2)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+2], 'tomato', 2)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+2], 'pickles', 2)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+2], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+2], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+2], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+2], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+2], 'mayo', 2)}
        </>
      break;
      case 'Cheeseburger' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+2], 'lettuce', 2)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+2], 'tomato', 2)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+2], 'pickles', 2)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+2], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+2], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+2], 'slaw', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+2], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+2], 'mayo', 2)}
        </>
      break;
      case 'Chicken Sandwich' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+2], 'lettuce', 2)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+2], 'tomato', 2)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+2], 'pickles', 2)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+2], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+2], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+2], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+2], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+2], 'mayo', 2)}
        </>
      break;
      case 'Thick Fried Bologna Burger' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Lettuce', this.state.lettuceChecked[itemIndex+2], 'lettuce', 2)}
        {displayCondiment('Tomato', this.state.tomatoChecked[itemIndex+2], 'tomato', 2)}
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+2], 'pickles', 2)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+2], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+2], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+2], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+2], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+2], 'mayo', 2)}
        </>
      break;
      case 'Hotdog (100% Beef)' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+2], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+2], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+2], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+2], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        </>
      break;
      case 'Corndog' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+2], 'onion', 2)}
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+2], 'chili', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+2], 'slaw', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+2], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        </>
      break;
      case 'BBQ Sandwich' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pickles', this.state.picklesChecked[itemIndex+2], 'pickles', 2)}
        {displayCondiment('Onion', this.state.onionChecked[itemIndex+2], 'onion', 2)}
        {displayCondiment('Slaw', this.state.slawChecked[itemIndex+2], 'slaw', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+2], 'jalapenos', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        </>
      break;
      case 'Chicken Tenders (4 piece)' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        </>
      break;
      case 'Chicken Wings (5 piece)' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        </>
      break;
      case 'Mozzarella Cheese Sticks' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        </>
      break;
      case 'Fried Pickles' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        </>
      break;
      case 'French Fries' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        </>
      break;
      case 'Onion Rings' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        </>
      break;
      case 'Small Popcorn' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[itemIndex+2], 'butter', 2)}
        </>
      break;
      case 'Large Popcorn' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[itemIndex+2], 'butter', 2)}
        </>
      break;
      case 'Nachos w/cheese' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Chili', this.state.chiliChecked[itemIndex+2], 'chili', 2)}
        {displayCondiment('Cheese', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        {displayCondiment('Jalapenos', this.state.jalapenosChecked[itemIndex+2], 'jalapenos', 2)}
        </>
      break;
      case 'Small Drink 12 oz' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+2], 'coke', 2)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+2], 'cokeZero', 2)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+2], 'sprite', 2)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+2], 'sundrop', 2)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+2], 'cherryLemonSundrop', 2)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+2], 'cherryFanta', 2)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+2], 'drPepper', 2)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+2], 'goldPeakTea', 2)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+2], 'countryTimeLemonade', 2)}
        </>
      break;
      case 'Large Drink 20 oz' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+2], 'coke', 2)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+2], 'cokeZero', 2)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+2], 'sprite', 2)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+2], 'sundrop', 2)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+2], 'cherryLemonSundrop', 2)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+2], 'cherryFanta', 2)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+2], 'drPepper', 2)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+2], 'goldPeakTea', 2)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+2], 'countryTimeLemonade', 2)}
        </>
      break;
      case 'Souvenir Cup 44 oz' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+2], 'coke', 2)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+2], 'cokeZero', 2)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+2], 'sprite', 2)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+2], 'sundrop', 2)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+2], 'cherryLemonSundrop', 2)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+2], 'cherryFanta', 2)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+2], 'drPepper', 2)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+2], 'goldPeakTea', 2)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+2], 'countryTimeLemonade', 2)}
        </>
      break;
      case 'Souvenir Cup Refill' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Coke', this.state.cokeChecked[itemIndex+2], 'coke', 2)}
        {displayCondiment('Coke Zero', this.state.cokeZeroChecked[itemIndex+2], 'cokeZero', 2)}
        {displayCondiment('Sprite', this.state.spriteChecked[itemIndex+2], 'sprite', 2)}
        {displayCondiment('Sun Drop', this.state.sundropChecked[itemIndex+2], 'sundrop', 2)}
        {displayCondiment('Cherry Lemon Sun Drop', this.state.cherryLemonSundropChecked[itemIndex+2], 'cherryLemonSundrop', 2)}
        {displayCondiment('Cherry Fanta', this.state.cherryFantaChecked[itemIndex+2], 'cherryFanta', 2)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+2], 'drPepper', 2)}
        {displayCondiment('Gold Peak Tea', this.state.goldPeakTeaChecked[itemIndex+2], 'goldPeakTea', 2)}
        {displayCondiment('Country Time Lemonade', this.state.countryTimeLemonadeChecked[itemIndex+2], 'countryTimeLemonade', 2)}
        </>
      break;
      case 'Funnel Cake' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Powdered', this.state.powderedChecked[itemIndex+2], 'powdered', 2)}
        {displayCondiment('Cinnamon Sugar', this.state.cinnamonSugarChecked[itemIndex+2], 'cinnamonSugar', 2)}
        {displayCondiment('Chocolate Syrup', this.state.chocolateSyrupChecked[itemIndex+2], 'chocolateSyrup', 2)}
        {displayCondiment('Strawberry Syrup', this.state.strawberrySyrupChecked[itemIndex+2], 'strawberrySyrup', 2)}
        </>
      break;
      case 'Homemade Cookies' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Chocolate Chip', this.state.chocolateChipChecked[itemIndex+2], 'chocolateChip', 2)}
        {displayCondiment('Oatmeal Raisin', this.state.oatmealRaisinChecked[itemIndex+2], 'oatmealRaisin', 2)}
        {displayCondiment('Peanut Butter', this.state.peanutButterChecked[itemIndex+2], 'peanutButter', 2)}
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

