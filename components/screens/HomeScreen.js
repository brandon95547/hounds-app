import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Left, Right, Icon, Drawer, Container } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import { globals, componentStyles } from '../GlobalStyles';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false
        };
        
        this.toggleOpen = this.toggleOpen.bind(this);
      }

      toggleOpen() {
        this.setState({ open: !this.state.open });
      }
    
      drawerContent = () => {
        return (
          <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
            <Text>Close</Text>
          </TouchableOpacity>
        );
      };
    
      render() {
        return (
            <MenuDrawer 
              open={this.state.open} 
              drawerContent={this.drawerContent()}
              drawerPercentage={45}
              animationTime={250}
              overlay={true}
              opacity={0.4}
            >   
                <Header toggleOpen={this.toggleOpen} />
                
                <View style={componentStyles.frontPageBody}>
                    <Image style={{ height: imageHeight, width: imageWidth, marginTop: 100 }} source={require('../../assets/img/popcorn.gif')} />
                </View>

            </MenuDrawer>
        );
      }
}