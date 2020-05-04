import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Left, Right, Icon, Drawer, Container, Button } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import { globals, componentStyles } from '../GlobalStyles';

import popcorn from '../../assets/img/popcorn.gif';

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
            <SideBar />
          </TouchableOpacity>
        );
      };
    
      render() {
        
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
                <Header toggleOpen={this.toggleOpen} />
                
                <View style={componentStyles.frontPageBody}>
                  <Image style={{ height: imageHeight, width: imageWidth, marginTop: 65 }} source={popcorn} />
                  
                  <Button onPress={() => this.props.navigation.navigate("Start")} style={componentStyles.primaryButton} block>
                      <Text style={{color: "white", fontWeight: "bold"}}>START PICKUP ORDER</Text>
                  </Button>
                  <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Button onPress={() => this.props.navigation.navigate("NewAccount")} style={componentStyles.joinButtons} transparent>
                        <Text style={{color: "white", fontWeight: "bold"}}>Join</Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate("Login")} style={componentStyles.joinButtons} transparent>
                        <Text style={{color: "white", fontWeight: "bold"}}>Login</Text>
                    </Button>
                  </View>
                </View>


            </MenuDrawer>
        );
      }
}