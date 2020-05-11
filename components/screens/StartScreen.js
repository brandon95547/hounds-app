import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors } from '../GlobalStyles'

import mainPhoto from '../../assets/img/mainPhoto.jpg'

const dimensions = Dimensions.get('window')
const imageHeight = Math.round(dimensions.width * 9 / 16)
const imageWidth = dimensions.width

export default class StartScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      open: false,
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  componentDidMount() {

  }

  drawerContent = () => {
    return (
      <TouchableOpacity style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    )
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
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
          
          <View style={componentStyles.interiorBody}>
            <Image style={{ width: imageWidth, height: imageHeight }} source={mainPhoto}/>
            <View style={{padding: 20}}>
              <Text style={componentStyles.textNode}>114 Raven Cir,</Text>
              <Text style={componentStyles.textNode}>Kings Mountain, NC 28086</Text>
              <Text style={{...{ marginTop: 10, marginBottom: 10 },...componentStyles.textNode}}>Hours: 6 pm to 12 am</Text>
              <Text style={componentStyles.textNode}>
                <Icon style={componentStyles.colorPrimary} type="MaterialCommunityIcons" name='phone' /> (704) 739-4424
              </Text>
            </View>
            <Button style={componentStyles.primaryButton} block onPress={() => this.props.navigation.navigate("StartPickup")}>
                <Text style={{color: "white", fontWeight: "bold"}}>PROCEED TO MENU</Text>
            </Button>
          </View>

      </MenuDrawer>
    )
  }
}