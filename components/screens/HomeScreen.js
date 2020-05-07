import React, { Component, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Left, Right, Icon, Drawer, Container, Button } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import styled from 'styled-components'
import * as Font from 'expo-font';
import { globals, componentStyles, colors } from '../GlobalStyles';

// this is our clobal context module to store global session state across screens
import UserContext from '../../UserContext'

// we need to import all images for react native
import popcorn from '../../assets/img/popcorn.gif';

export default class HomeScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        assetsLoaded: false,
        user: null
      };

      this.toggleOpen = this.toggleOpen.bind(this);
  }

  
  isLoggedIn = async () => {
    const { user, setUser } = this.context

    let returnValue = null
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        setUser(JSON.parse(value))
        console.log('context user has been set with storage user')
      }
    } catch (error) {
      // Error retrieving data
    }
    if(returnValue) {
      this.setState({ user: JSON.parse(returnValue)})
    }
  };
  
  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    );
  };
  
  static contextType = UserContext
  
  async componentDidMount() {
    await Font.loadAsync({
      'poppins-normal': require('../../assets/fonts/Poppins_400_normal.ttf')
    });
    
    this.setState({ assetsLoaded: true });
    this.isLoggedIn()

  }

  render() {

    const { user, setUser } = this.context

    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width;
    const {assetsLoaded} = this.state;
    
    const joinButtons = user === null ? <View style={{ flexDirection: "row", justifyContent: "center" }}>
<Button onPress={() => this.props.navigation.navigate("NewAccount")} style={styles.joinButtons} transparent>
    <Text style={styles.joinButtonsText}>Join</Text>
</Button>
<Button onPress={() => this.props.navigation.navigate("Login")} style={styles.joinButtons} transparent>
    <Text style={styles.joinButtonsText}>Login</Text>
</Button>
</View> : <View></View>

    if(assetsLoaded) {
      return (
          <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={65}
          animationTime={250}
          overlay={true}
          opacity={0.4}
          >   
              <Header navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
              
              <View style={styles.container}>
                <Image style={{ height: imageHeight, width: imageWidth, marginTop: 65 }} source={popcorn} />
                
                <Button onPress={() => this.props.navigation.navigate(user ? "Start" : "Login")} style={componentStyles.primaryButton} block>
                    <Text style={styles.joinButtonsText}>START PICKUP ORDER</Text>
                </Button>
                
                {joinButtons}
              </View>

          </MenuDrawer>
      )
    }
    else {
      return(
        <View><Text>Loading</Text></View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    height: "100%"
  },
  joinButtons: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 20,
  },
  joinButtonsText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    fontFamily: 'poppins-normal'
  },
})
