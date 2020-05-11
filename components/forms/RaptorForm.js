import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, CheckBox, AsyncStorage, Picker } from 'react-native';
import { Left, Right, Icon, Drawer } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { colors } from '../GlobalStyles';
import UserContext from '../../UserContext'

export default class RaptorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      value: '',
      checkInputValue: 0,
      type: 'default',
      checked: {},
      cart: [],
      itemIndex: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.checkboxChange = this.checkboxChange.bind(this)
  }

  static contextType = UserContext

  _storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      // Error saving data
    }
  };

  textInputChange(text) {
    this.setState({ text: text })
  }

  checkboxChange(index, key, price, title, quantity) {
    const { isLoggedIn, setCartData, setCartTotal } = this.context
    let currentChecked = this.state.checked
    currentChecked[key] = quantity
    this.setState({ checked: currentChecked })
    let cartItems = this.state.cart

    let cartData = {
      key: key,
      price: price,
      title: title,
      quantity: quantity
    }

    cartItems[index] = cartData
    setCartData(cartItems)
	}

  getItems(index) {
    var categories = ["HOT FOODS", "SNACKS & CANDY", "DRINKS", "ICE CREAM", "MISCELLANEOUS"]
    return this.props.tableItems[index]
  }

  buildItems() {
    const state = this.state;
    const textInput = (key, index, price, title) => (
      <>
        <TextInput style = {RaptorFormStyles.textInput}
          underlineColorAndroid = "transparent"
          placeholder = "0"
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          onChangeText = {(quantity) => this.checkboxChange(index, key, price, title, quantity)}
        />
      </>
    );
    const textInput2 = (key, index, price, title) => (
      <>
        <Picker
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
    );
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
    return (
      this.props.foodCategories.map((category, index) => (
      <View key={index} style={RaptorFormStyles.container}>
        <View style={RaptorFormStyles.heading}><Text style={RaptorFormStyles.headingText}>{category}</Text></View>
        <Table>
          <Row data={this.props.tableHead} style={RaptorFormStyles.tableHeading} textStyle={RaptorFormStyles.rowTextStyle}/>
          {
            this.getItems(index).map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={RaptorFormStyles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 2 ? textInput2(cellData, rowData[2], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/>
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
  buttonText: {
    color: "white",
  },
  picker: {
    width: 60,
    height: 40
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
});