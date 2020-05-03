import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Left, Right, Icon, Drawer } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { colors } from '../GlobalStyles';
import { Formik } from 'formik';

export default class RaptorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      type: 'default',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  submitForm() {

  }

  getItems(index) {
    var categories = ["HOT FOODS", "SNACKS & CANDY", "DRINKS", "ICE CREAM", "MISCELLANEOUS"]
    return this.props.tableItems[index]
  }

  buildItems() {
    return (
      this.props.foodCategories.map((category, index) => (
      <View key={index} style={RaptorFormStyles.tableWrap}>
        <View style={RaptorFormStyles.heading}><Text style={RaptorFormStyles.headingText}>{category}</Text></View>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.props.tableHead} style={RaptorFormStyles.head} textStyle={RaptorFormStyles.text}/>
          <Rows data={this.getItems(index)} textStyle={RaptorFormStyles.text}/>
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
            <Text style={{ color: "inherit", fontWeight: "inherit" }}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
}

const RaptorFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  buttonWrap: {
    alignItems: "center",
    marginTop: 24,
    fontFamily: "poppins-normal"
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 10,
    width: "80%",
    color: "white",
    fontWeight: "bold"
  },
  heading: {
    backgroundColor: colors.primary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
  },
  headingText: {
    color: "white",
    fontFamily: "poppins-normal"
  },
  text: {
    margin: 6
  },
  tableWrap: {
    marginTop: 24
  },
  submitButton: {
    marginTop: 24
  }
});