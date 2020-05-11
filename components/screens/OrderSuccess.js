import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Left, Right, Icon, Drawer, Container, Button } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import { globals, componentStyles, colors } from '../GlobalStyles';
import ReactDOM from "react-dom";
import * as Font from 'expo-font';

import loadingAnimation from '../../assets/img/a3724efc0c85bd69c4366d96547cb667.gif';

export default class OrderSuccess extends React.Component {
  constructor() {
    super();

    this.state = {
      assetsLoaded: false,
      open: false,
    }

    this.toggleOpen = this.toggleOpen.bind(this);

  }

  componentDidMount() {
    // this.sendOrderNumber()
  }

  generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 6);
  }

  sendOrderNumber() {
    var _this = this
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        
        // _this.refs.childToast.showToast(response.success ? colors.green : colors.failure, response.message)
        // localStorage.setItem('user', response.user);
        // match the timeout from show alert before switching pages because the component will not be available to setState, if not
        if(response.success) {
          // _this._storeData("user", response.user)
          // set user state from context
          // setUser(JSON.parse(response.user))
          // setTimeout(() => {
          //   _this.props.navigation.navigate('Home');
          // }, 1500);
        }
      }
    }

    var theUrl = "http://bluechipadvertising.com/generateOrder.php";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({orderNumber: _this.generateRandomString() }));

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

  render() {
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
            <View>
              <Text style={styles.pageTitle}>IN-STORE PICKUP INSTRUCTIONS</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.pageTitle}>Pickup Location</Text>
              <View style={{ marginLeft: "auto" }}><Text>114 Raven Cir,</Text>
              <Text>Kings Mountain, NC 28086</Text></View>
            </View>
            <View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Icon style={componentStyles.colorPrimary} type="MaterialCommunityIcons" name='phone' />
                <Text>When your order is ready, you will receive an email and a push notification.</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Icon style={componentStyles.colorPrimary} type="MaterialCommunityIcons" name='phone' />
                <Text>Share your name and order number with the employee at the counter.</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Icon style={componentStyles.colorPrimary} type="MaterialCommunityIcons" name='phone' />
                <Text>Enjoy!</Text>
              </View>
              </View>
            </View>
      </MenuDrawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16
  },
});