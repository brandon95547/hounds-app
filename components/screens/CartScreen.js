import React from 'react';
import {StyleSheet, Text, View, Platform, FlatList} from 'react-native';
import Header from '../Header';
import NavBar from '../NavBar';
import CartItem from '../CartItem';
import {FaPhone} from 'react-icons/fa';
import ReactDOM from "react-dom";

export default class CartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      styles: {
        marginTop: 8
      },
      cartItems: null
    }

  }

  isLoggedIn() {
    /* let user = localStorage.getItem("user");
    return user ? true : false */
  }

  componentDidMount() {
    /* var node = ReactDOM.findDOMNode(this.refs["appHeader"]);
    this.setState({
      styles: {
        marginTop: node.offsetHeight
      },
      cartItems: localStorage.getItem("cartItems")
    }); */
  }

  render() {

    return (
      <View style={styles.container}>
        <Header
          interior={true}
          navigation={this.props.navigation}
          title="Cart"
          ref="appHeader"/>

          

      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});