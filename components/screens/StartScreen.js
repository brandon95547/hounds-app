import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Left, Right, Icon, Drawer, Container, Button } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import { globals, componentStyles, colors } from '../GlobalStyles';
import ReactDOM from "react-dom";
import * as Font from 'expo-font';

import mapImage from '../../assets/img/map.png';

export default class StartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      assetsLoaded: false,
      todoInput: '',
      open: false,
      styles: {
        marginTop: 8
      },
      todos: [
        {
          id: 1,
          title: 'my title 1',
          done: false
        }, {
          id: 2,
          title: 'my title 2',
          done: false
        }
      ]
    }

    this.toggleOpen = this.toggleOpen.bind(this);

  }

  isLoggedIn() {
    // let user = localStorage.getItem("user");
    // return user ? true : false
  }

  async componentDidMount() {
    /* await Font.loadAsync({
        'poppins-normal': require('../../assets/fonts/Poppins_400_normal.ttf')
    });
    this.setState({ assetsLoaded: true }); */
    // setState({ contentHeight: measureElement(this.content).height });
    // this.adjustGap();
    /* var node = ReactDOM.findDOMNode(this.refs["appHeader"]);
    this.setState({
      styles: {
        marginTop: node.offsetHeight
      }
    }); */
  }

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    );
  };

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {

    // let continueButtonPage = this.isLoggedIn() ? "StartPickup" : "Login";

    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width;

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
          
          <View style={componentStyles.interiorBody}>
            <Image style={{ width: imageWidth, height: imageHeight }} source={mapImage}/>
            <View style={{padding: 20}}>
              <Text style={componentStyles.textNode}>114 Raven Cir,</Text>
              <Text style={componentStyles.textNode}>Kings Mountain, NC 28086</Text>
              <Text style={componentStyles.textNode}>
                <Icon style={componentStyles.colorPrimary} type="MaterialCommunityIcons" name='phone' /> (704) 739-4424
              </Text>
            </View>
            <Button style={componentStyles.primaryButton} block onPress={() => this.props.navigation.navigate("StartPickup")}>
                <Text style={{color: "white", fontWeight: "bold"}}>START PICKUP ORDER</Text>
            </Button>
          </View>

      </MenuDrawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  adjustGap: {
    marginTop: 0
  }
});