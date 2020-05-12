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

export default class EditFoodScreen extends React.Component {
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
          
          <View style={styles.container}>
            <View style={styles.pageTitleWrap}>
              <Text style={styles.pageTitle}>EDIT ITEM: </Text>
            </View>
          </View>

      </MenuDrawer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  pageTitleWrap: {
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
})