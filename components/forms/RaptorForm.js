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
      lettuceChecked: false,
      tomatoChecked: false,
      picklesChecked: false,
      onionChecked: false,
      chiliChecked: false,
      slawChecked: false,
      cheeseChecked: false,
      jalapenosChecked: false,
      ketchupChecked: false,
      mustardChecked: false,
      ranchChecked: false,
      honeyMustardChecked: false,
      butterChecked: false,
      bbqChecked: false,
      // drinks
      cokeChecked: false,
      cokeZeroChecked: false,
      spriteChecked: false,
      sundropChecked: false,
      cherryLemonSundropChecked: false,
      cherryFantaChecked: false,
      drPepperChecked: false,
      goldPeakTeaChecked: false,
      countryTimeLemonadeChecked: false,
      itemToUpdate: 0,
      itemToUpdateTitle: '',
    }

    this.checkboxChange = this.checkboxChange.bind(this)
  }

  static contextType = UserContext

  setModalVisible(value) {
    this.setState({ modalVisible: value })
  }

  componentDidMount() {
    this.getFoodItems()
  }

  checkboxChange(index, key, price, title, quantity) {
    const { isLoggedIn, setCartData, setCartTotal } = this.context
    let currentChecked = this.state.checked
    currentChecked[key] = quantity
    this.setState({ checked: currentChecked })
    let cartItems = this.state.cart
    
    this.setState({ itemToUpdate: index })
    this.setState({ itemToUpdateTitle: title })

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

    if(itemsThatNeedOptions.includes(title)) {
      this.setModalVisible(true)
    }
    
    let cartData = {
      key: key,
      price: price,
      title: title,
      quantity: quantity,
      condiments: []
    }   
    
    cartItems[index] = cartData
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
  updateFoodItem(item) {
    const { isLoggedIn, setCartData, setCartTotal } = this.context
    prevCart = this.state.cart[this.state.itemToUpdate]

    // check if the item is already added to the cart
    var index = prevCart.condiments.indexOf(item)
    console.log(index)

    switch(item) {
      case 'lettuce' :
        this.setState({ lettuceChecked: !this.state.lettuceChecked })
      break
      case 'tomato' :
        this.setState({ tomatoChecked: !this.state.tomatoChecked })
      break
      case 'pickles' :
        this.setState({ picklesChecked: !this.state.picklesChecked })
      break
      case 'onion' :
        this.setState({ onionChecked: !this.state.onionChecked })
      break
      case 'chili' :
        this.setState({ chiliChecked: !this.state.chiliChecked })
      break
      case 'slaw' :
        this.setState({ slawChecked: !this.state.slawChecked })
      break
      case 'cheese' :
        this.setState({ cheeseChecked: !this.state.cheeseChecked })
      break
      case 'jalapenos' :
        this.setState({ jalapenosChecked: !this.state.jalapenosChecked })
      break
      case 'ketchup' :
        this.setState({ ketchupChecked: !this.state.ketchupChecked })
      break
      case 'mustard' :
        this.setState({ mustardChecked: !this.state.mustardChecked })
      break
      case 'ranch' :
        this.setState({ ranchChecked: !this.state.ranchChecked })
      break
      case 'honeymustard' :
        this.setState({ honeyMustardChecked: !this.state.honeyMustardChecked })
      break
      case 'bbq' :
        this.setState({ bbqChecked: !this.state.bbqChecked })
      break
      case 'butter' :
        this.setState({ butterChecked: !this.state.butterChecked })
      break
      case 'coke' :
        this.setState({ cokeChecked: !this.state.cokeChecked })
      break
      case 'cokeZero' :
        this.setState({ cokeZeroChecked: !this.state.cokeZeroChecked })
      break
      case 'sprite' :
        this.setState({ spriteChecked: !this.state.spriteChecked })
      break
      case 'sundrop' :
        this.setState({ sundropChecked: !this.state.sundropChecked })
      break
      case 'cherrylemonsundrop' :
        this.setState({ cherryLemonSundropChecked: !this.state.cherryLemonSundropChecked })
      break
      case 'cherryfanta' :
        this.setState({ cherryFantaChecked: !this.state.cherryFantaChecked })
      break
      case 'drpepper' :
        this.setState({ drPepperChecked: !this.state.drPepperChecked })
      break
      case 'goldpeaktea' :
        this.setState({ goldPeakTeaChecked: !this.state.goldPeakTeaChecked })
      break
      case 'countrytimelemonade' :
        this.setState({ countryTimeLemonadeChecked: !this.state.countryTimeLemonadeChecked })
      break
    }

    if(index === -1) {
      prevCart.condiments.push(item)
    }
    else {
      prevCart.condiments.splice(index, 1)
    }
    console.log(prevCart)
    setCartData(prevCart)
  }

  buildItems() {
    const { publicFoodItems } = this.context
    const state = this.state
    const textInput2 = (key, index, price, title) => (
      <>
        <Picker
          style={RaptorFormStyles.onePicker} itemStyle={RaptorFormStyles.onePickerItem}
          selectedValue={this.state.checked[key]}
          style={RaptorFormStyles.picker}
          onValueChange={(quantity) => this.checkboxChange(index, key, price, title, quantity)}
        >
          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
      </>
    )

    const checkboxInput = (key, index, price, title) => (
      <>
        <CheckBox
          value={this.state.checked[key]}
          onValueChange={() => this.checkboxChange(index, key, price, title)}
          style={RaptorFormStyles.checkbox}
        />
      </>
    )

    const wrapper = (data) => {
      return <Text style={RaptorFormStyles.cell}>{data}</Text>
    }

    const condiments = {
      lettuce : <View style={styles.foodOption}>
            <Text style={{ flex: 1 }}>Lettuce</Text>
            <CheckBox
              value={this.state.lettuceChecked}
              onValueChange={() => this.updateFoodItem('lettuce')}
              style={styles.checkbox}
            />
          </View>,
      tomato : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Tomato</Text>
        <CheckBox
          value={this.state.tomatoChecked}
          onValueChange={() => this.updateFoodItem('tomato')}
          style={styles.checkbox}
        />
      </View>,
      pickles : <View style={styles.foodOption}>
      <Text style={{ flex: 1 }}>Pickles</Text>
        <CheckBox
          value={this.state.picklesChecked}
          onValueChange={() => this.updateFoodItem('pickles')}
          style={styles.checkbox}
        />
      </View>,
      onion : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Onion</Text>
        <CheckBox
          value={this.state.onionChecked}
          onValueChange={() => this.updateFoodItem('onion')}
          style={styles.checkbox}
        />
      </View>,
      chili : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Chili</Text>
        <CheckBox
          value={this.state.chiliChecked}
          onValueChange={() => this.updateFoodItem('chili')}
          style={styles.checkbox}
        />
      </View>,
      slaw : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Slaw</Text>
        <CheckBox
          value={this.state.slawChecked}
          onValueChange={() => this.updateFoodItem('slaw')}
          style={styles.checkbox}
        />
      </View>,
      cheese : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Cheese</Text>
        <CheckBox
          value={this.state.cheeseChecked}
          onValueChange={() => this.updateFoodItem('cheese')}
          style={styles.checkbox}
        />
      </View>,
      jalapenos : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Jalapenos</Text>
        <CheckBox
          value={this.state.jalapenosChecked}
          onValueChange={() => this.updateFoodItem('jalapenos')}
          style={styles.checkbox}
        />
      </View>,
      ketchup : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Ketchup</Text>
        <CheckBox
          value={this.state.ketchupChecked}
          onValueChange={() => this.updateFoodItem('ketchup')}
          style={styles.checkbox}
        />
      </View>,
      mustard : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Mustard</Text>
        <CheckBox
          value={this.state.mustardChecked}
          onValueChange={() => this.updateFoodItem('mustard')}
          style={styles.checkbox}
        />
      </View>,
      ranch : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Ranch</Text>
        <CheckBox
          value={this.state.ranchChecked}
          onValueChange={() => this.updateFoodItem('ranch')}
          style={styles.checkbox}
        />
      </View>,
      honeymustard : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Honey Mustard</Text>
        <CheckBox
          value={this.state.honeyChecked}
          onValueChange={() => this.updateFoodItem('honeymustard')}
          style={styles.checkbox}
        />
      </View>,
      bbq : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>BBQ</Text>
        <CheckBox
          value={this.state.bbqChecked}
          onValueChange={() => this.updateFoodItem('bbq')}
          style={styles.checkbox}
        />
      </View>,
      butter : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Butter</Text>
        <CheckBox
          value={this.state.butterChecked}
          onValueChange={() => this.updateFoodItem('butter')}
          style={styles.checkbox}
        />
      </View>,
      coke : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Coke</Text>
        <CheckBox
          value={this.state.cokeChecked}
          onValueChange={() => this.updateFoodItem('coke')}
          style={styles.checkbox}
        />
      </View>,
      cokeZero : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Coke Zero</Text>
        <CheckBox
          value={this.state.cokeZeroChecked}
          onValueChange={() => this.updateFoodItem('cokezero')}
          style={styles.checkbox}
        />
      </View>,
      sprite : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Sprite</Text>
        <CheckBox
          value={this.state.spriteChecked}
          onValueChange={() => this.updateFoodItem('sprite')}
          style={styles.checkbox}
        />
      </View>,
      sundrop : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Sundrop</Text>
        <CheckBox
          value={this.state.sundropChecked}
          onValueChange={() => this.updateFoodItem('sundrop')}
          style={styles.checkbox}
        />
      </View>,
      cherryLemonSundrop : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Cherry Lemon Sundrop</Text>
        <CheckBox
          value={this.state.cherryLemonSundropChecked}
          onValueChange={() => this.updateFoodItem('cherrylemonsundrop')}
          style={styles.checkbox}
        />
      </View>,
      cherryFanta : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Cherry Fanta</Text>
        <CheckBox
          value={this.state.cherryFantaChecked}
          onValueChange={() => this.updateFoodItem('cherryfanta')}
          style={styles.checkbox}
        />
      </View>,
      drPepper : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Dr Pepper</Text>
        <CheckBox
          value={this.state.drPepperChecked}
          onValueChange={() => this.updateFoodItem('drpepper')}
          style={styles.checkbox}
        />
      </View>,
      goldPeakTea : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Gold Peak Tea</Text>
        <CheckBox
          value={this.state.goldPeakTeaChecked}
          onValueChange={() => this.updateFoodItem('goldpeaktea')}
          style={styles.checkbox}
        />
      </View>,
      countryTimeLemonade : <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>Country Time Lemonade</Text>
        <CheckBox
          value={this.state.countryTimeLemonadeChecked}
          onValueChange={() => this.updateFoodItem('countrytimelemonade')}
          style={styles.checkbox}
        />
      </View>,
    }

    let foodOptions = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
      case 'Cheeseburger' :
      case 'Chicken Sandwich' :
      case 'Thick Fried Bologna Burger' :
        foodOptions = <ScrollView contentContainerStyle={styles.foodOptionContainer}>
          <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
          {condiments.lettuce}
          {condiments.tomato}
          {condiments.pickles}
          {condiments.onion}
          {condiments.chili}
          {condiments.slaw}
          {condiments.cheese}
          {condiments.jalapenos}
          <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
          {condiments.ketchup}
          {condiments.mustard}
          {condiments.ranch}
          {condiments.honeymustard}
          {condiments.bbq}
        </ScrollView>
      break

      case 'Hotdog (100% Beef)' :
      case 'Corndog' :
        foodOptions = <ScrollView contentContainerStyle={styles.foodOptionContainer}>
          <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
          {condiments.onion}
          {condiments.chili}
          {condiments.slaw}
          {condiments.cheese}
          {condiments.jalapenos}
        </ScrollView>
      break

      case 'BBQ Sandwich' :
        foodOptions = <ScrollView contentContainerStyle={styles.foodOptionContainer}>
          <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
          {condiments.pickles}
          {condiments.onion}
          {condiments.slaw}
          {condiments.jalapenos}
          <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
          {condiments.ketchup}
          {condiments.mustard}
          {condiments.ranch}
          {condiments.honeymustard}
        </ScrollView>
      break

      case 'Chicken Tenders (4 piece)' :
      case 'Chicken Wings (5 piece)' :
      case 'Mozzerella Cheese Sticks' :
      case 'Fried Pickles' :
      case 'French Fries' :
      case 'Onion Rings' :

        foodOptions = <ScrollView contentContainerStyle={styles.foodOptionContainer}>
          <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
          {condiments.ketchup}
          {condiments.mustard}
          {condiments.ranch}
          {condiments.honeymustard}
          {condiments.bbq}
        </ScrollView>
      break

      case 'Small Popcorn' :
      case 'Large Popcorn' :
        foodOptions = <ScrollView contentContainerStyle={styles.foodOptionContainer}>
          <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
          {condiments.butter}
        </ScrollView>
      break
      
      case 'Nachos w/cheese' :
        foodOptions = <ScrollView contentContainerStyle={styles.foodOptionContainer}>
          <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
          {condiments.chili}
          {condiments.cheese}
          {condiments.jalapenos}
        </ScrollView>
      break
      
      case 'Small Drink 12 oz' :
      case 'Large Drink 20 oz' :
      case 'Souvenir Cup 44 oz' :
      case 'Souvenir Cup Refill' :

        foodOptions = <ScrollView contentContainerStyle={styles.foodOptionContainer}>
          <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
          {condiments.coke}
          {condiments.cokeZero}
          {condiments.sprite}
          {condiments.sundrop}
          {condiments.cherryLemonSundrop}
          {condiments.cherryFanta}
          {condiments.drPepper}
          {condiments.goldPeakTea}
          {condiments.countryTimeLemonade}
        </ScrollView>
      break

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
          {foodOptions}

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
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? textInput2(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
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
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? textInput2(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
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
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? textInput2(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
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
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? textInput2(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
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