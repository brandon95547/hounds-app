import React from 'react';
import {StyleSheet, Text, View, Platform, AsyncStorage, TouchableOpacity} from 'react-native';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import NavBar from '../NavBar';
import CartItem from '../CartItem';
import ReactDOM from "react-dom";
import * as Font from 'expo-font';
import { globals, componentStyles, colors } from '../GlobalStyles';

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

  isLoggedIn = async (key) => {
    let returnValue = null
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        returnValue = value
      }
    } catch (error) {
      // Error retrieving data
    }
    if(returnValue) {
      this.setState({ user: JSON.parse(returnValue)})
    }
  };

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    );
  };

  async componentDidMount() {
    await Font.loadAsync({
        'poppins-normal': require('../../assets/fonts/Poppins_400_normal.ttf')
    });

    this.setState({ assetsLoaded: true });
    this.isLoggedIn('user')
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

        <View>
          <Text>Cart Page</Text>
        </View>

        </MenuDrawer>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});