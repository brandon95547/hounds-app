import React, { Component, useContext } from 'react'
import * as Font from 'expo-font'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import styled from 'styled-components'
import { globals, componentStyles, colors } from '../GlobalStyles'

// this is our clobal context module to store global session state across screens
import UserContext from '../../UserContext'

// we need to import all images for react native
import popcorn from '../../assets/img/popcorn.gif'

const dimensions = Dimensions.get('window')
const imageHeight = Math.round(dimensions.width * 9 / 16)
const imageWidth = dimensions.width

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      assetsLoaded: false,
      user: null
    }
      
    this.toggleOpen = this.toggleOpen.bind(this)
  }
  
  static contextType = UserContext
  
  async componentDidMount() {
    // const { isLoggedIn } = this.context
    await Font.loadAsync({
      'poppins-normal': require('../../assets/fonts/Poppins_400_normal.ttf')
    });
    this.setState({ assetsLoaded: true })
  }

  componentDidUpdate() {
    const { user } = this.context
    console.log(user)
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }

  drawerContent = () => {
    return (
      <TouchableOpacity style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    )
  }

  render() {
    
    const { assetsLoaded } = this.state
    const { user } = this.context

    let continueButton = user ? "Start" : "Login";

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
                
                <Button onPress={() => this.props.navigation.navigate(continueButton)} style={styles.primaryButton} block>
                    <Text style={styles.joinButtonsText}>START PICKUP ORDER</Text>
                </Button>
                
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <Button onPress={() => this.props.navigation.navigate("NewAccount")} style={styles.joinButtons} transparent>
                      <Text style={styles.joinButtonsText}>Join</Text>
                  </Button>
                  <Button onPress={() => this.props.navigation.navigate("Login")} style={styles.joinButtons} transparent>
                      <Text style={styles.joinButtonsText}>Login</Text>
                  </Button>
                </View>
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
  primaryButton: {
    backgroundColor: colors.primary,
    width: "75%",
    alignSelf: "center",
    marginTop: 50
  }
})
