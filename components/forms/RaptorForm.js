import React, { Component, useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, TouchableHighlight, AsyncStorage, Picker, Modal, CheckBox, Alert } from 'react-native'
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
    this.setModalVisible(true)
    
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

  getItems(index) {
    var categories = ["HOT FOODS", "SNACKS & CANDY", "DRINKS", "ICE CREAM", "MISCELLANEOUS"]
    return this.props.tableItems[index]
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
      lettuce : <View style={styles.flexTable}>
            <Text style={{ flex: 1 }}>Lettuce</Text>
            <CheckBox
              value={this.state.lettuceChecked}
              onValueChange={() => this.updateFoodItem('lettuce')}
              style={styles.checkbox}
            />
          </View>,
      tomato : <View style={styles.flexTable}>
        <Text style={{ flex: 1 }}>Tomato</Text>
        <CheckBox
          value={this.state.tomatoChecked}
          onValueChange={() => this.updateFoodItem('tomato')}
          style={styles.checkbox}
        />
      </View>,
      pickles : <View style={styles.flexTable}>
      <Text style={{ flex: 1 }}>Pickles</Text>
        <CheckBox
          value={this.state.picklesChecked}
          onValueChange={() => this.updateFoodItem('pickles')}
          style={styles.checkbox}
        />
      </View>,
      onion : <View style={styles.flexTable}>
        <Text style={{ flex: 1 }}>Onion</Text>
        <CheckBox
          value={this.state.onionChecked}
          onValueChange={() => this.updateFoodItem('onion')}
          style={styles.checkbox}
        />
      </View>,
      chili : <View style={styles.flexTable}>
        <Text style={{ flex: 1 }}>Chili</Text>
        <CheckBox
          value={this.state.chiliChecked}
          onValueChange={() => this.updateFoodItem('chili')}
          style={styles.checkbox}
        />
      </View>,
      slaw : <View style={styles.flexTable}>
        <Text style={{ flex: 1 }}>Slaw</Text>
        <CheckBox
          value={this.state.slawChecked}
          onValueChange={() => this.updateFoodItem('slaw')}
          style={styles.checkbox}
        />
      </View>,
      cheese : <View style={styles.flexTable}>
        <Text style={{ flex: 1 }}>Cheese</Text>
        <CheckBox
          value={this.state.cheeseChecked}
          onValueChange={() => this.updateFoodItem('cheese')}
          style={styles.checkbox}
        />
      </View>,
      jalapenos : <View style={styles.flexTable}>
        <Text style={{ flex: 1 }}>Jalapenos</Text>
        <CheckBox
          value={this.state.jalapenosChecked}
          onValueChange={() => this.updateFoodItem('jalapenos')}
          style={styles.checkbox}
        />
      </View>
    }

    let foodOptions = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
      case 'Cheeseburger' :
      case 'Chicken Sandwich' :
      case 'Thick Fried Balogna Burger' :
        foodOptions = <View style={{ backgroundColor: 'white', width: '80%', padding: 10, marginBottom: 10 }}>
          <View><Text style={{ fontWeight: "bold" }}>Select your options:</Text></View>
          {condiments.lettuce}
          {condiments.tomato}
          {condiments.pickles}
          {condiments.onion}
          {condiments.chili}
          {condiments.slaw}
          {condiments.cheese}
          {condiments.jalapenos}
        </View>
      break

      case 'Hotdog (100% Beef)' :
      case 'Corndog' :
        foodOptions = <View style={{ backgroundColor: 'white', width: '80%', padding: 10, marginBottom: 10 }}>
          <View><Text style={{ fontWeight: "bold" }}>Select your options:</Text></View>
          {condiments.onion}
          {condiments.chili}
          {condiments.slaw}
          {condiments.cheese}
          {condiments.jalapenos}
        </View>
      break

      case 'BBQ Sandwich' :
        foodOptions = <View style={{ backgroundColor: 'white', width: '80%', padding: 10, marginBottom: 10 }}>
          <View><Text style={{ fontWeight: "bold" }}>Select your options:</Text></View>
          {condiments.pickles}
          {condiments.onion}
          {condiments.slaw}
          {condiments.jalapenos}
        </View>
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
          <View style={styles.innerContainer}>
            {foodOptions}

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}
            >
              <Text style={styles.textStyle}>CLOSE OPTIONS</Text>
            </TouchableHighlight>
          </View>
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
  flexTable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
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
  },
  innerContainer: {
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
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