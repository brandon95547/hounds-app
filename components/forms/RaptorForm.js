import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, CheckBox, AsyncStorage } from 'react-native';
import { Left, Right, Icon, Drawer } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { colors } from '../GlobalStyles';

export default class RaptorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      value: '',
      checkInputValue: 0,
      type: 'default',
      checked: {},
      cart: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.checkboxChange = this.checkboxChange.bind(this)
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  _storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveCheckout = async (key) => {
    let returnValue = {}
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        returnValue = value
      }
    } catch (error) {
      // Error retrieving data
    }
    this.setState({ checked: JSON.parse(returnValue)})
  };

  componentDidMount() {
    this._retrieveCheckout("cart-checked")
  }

  textInputChange(text) {
    this.setState({ text: text })
  }

  checkboxChange(index, key, price, title) {
    let currentChecked = this.state.checked
    currentChecked[key] = !this.state.checked[key]
    this.setState({ checked: currentChecked })
    let cartItems = this.state.cart

    // if the array key has not been added
    if(cartItems.indexOf(key) === -1) {
      // if the button is on
      if(currentChecked[key]) {
        cartItems.push(key)
      }
    }
    else {
      // if the button is off
      if(!currentChecked[key]) {
        cartItems.splice(cartItems.indexOf(key), 1)
      }
      else {
        cartItems.push(key)
      }
    }
    this.setState({ cart: cartItems })
    /* cartItems.map((val, index) => (
      console.log(this.props.foodMap[val])
    )) */
    this._storeData("cart-items", JSON.stringify(cartItems))
    this._storeData("cart-checked", JSON.stringify(this.state.checked))
	}

  getItems(index) {
    var categories = ["HOT FOODS", "SNACKS & CANDY", "DRINKS", "ICE CREAM", "MISCELLANEOUS"]
    return this.props.tableItems[index]
  }

  buildItems() {
    const state = this.state;
    const textInput = (data, index) => (
      <>
        <TextInput style = {RaptorFormStyles.textInput}
          underlineColorAndroid = "transparent"
          placeholder = "0"
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"st
          onChangeText = {this.checkboxChange}
        />
      </>
    );
    const checkboxInput = (key, index, price, title) => (
      <>
        <CheckBox
          value={this.state.checked[key]}
          onValueChange={() => this.checkboxChange(index, key, price, title)}
          style={RaptorFormStyles.checkbox}
        />
      </>
    );
    return (
      this.props.foodCategories.map((category, index) => (
      <View key={index} style={RaptorFormStyles.container}>
        <View style={RaptorFormStyles.heading}><Text style={RaptorFormStyles.headingText}>{category}</Text></View>
        <Table>
          <Row data={this.props.tableHead} style={RaptorFormStyles.tableHeading} textStyle={RaptorFormStyles.rowTextStyle}/>
          {
            this.getItems(index).map((rowData, index) => (
              <TableWrapper key={index} style={RaptorFormStyles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 2 ? checkboxInput(cellData, index, rowData[1], rowData[0]) : cellData} textStyle={RaptorFormStyles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
      ))
    )
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <>
        {this.buildItems()}
        <View style={RaptorFormStyles.buttonWrap}>
          <TouchableOpacity
            style={RaptorFormStyles.button}
            onPress={this.submitForm}
          >
            <Text style={RaptorFormStyles.buttonText}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
}

const RaptorFormStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 22,
    borderWidth: 1,
    borderColor: "#CCC"
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
  buttonWrap: {
    alignItems: "center",
    marginTop: 24,
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
});