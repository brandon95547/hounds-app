import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, Picker, Alert } from 'react-native'
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors } from '../GlobalStyles'
import UserContext from '../../UserContext'

const dimensions = Dimensions.get('window')
const imageHeight = Math.round(dimensions.width * 9 / 16)
const imageWidth = dimensions.width

export default class EditOrderScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      open: false,
      itemID: 0,
      name: "",
      date: "",
      ready: 0,
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  static contextType = UserContext

  componentDidMount() {
    const { orderToEdit } = this.context
    console.log(orderToEdit);
    this.setState({ name: orderToEdit[0] })
    this.setState({ date: orderToEdit[1] })
    // this.setState({ category: orderToEdit[2] })
    this.setState({ itemID: orderToEdit[3] })
    // this.setState({ isAvailable: orderToEdit[4] })
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

  nameOnChange(name) {
    this.setState({ name: name })
  }

  dateOnChange(price) {
    this.setState({ price: price })
  }

  categoryOnChange(category) {
    this.setState({ category: category })
  }

  readyOnChange(value) {
    this.setState({ ready: value })
  }

  updateItem() {
    let _this = this
    let state = this.state
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)

        console.log(response);

        if(response.success) {
          // _this.getFoodItems()
          Alert.alert(
            'Alert',
            "Update successful",
            [
              /* { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') }, */
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          );
          // set user state from context
          // setUser(JSON.parse(response.user))
          setTimeout(() => {
            // _this.props.navigation.navigate('Home')
          }, 1500)
        }
        else {
          Alert.alert(
            'Alert',
            "Update failed",
            [
              /* { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') }, */
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          );
        }
      }
    }

    var theUrl = "http://bluechipadvertising.com/updateOrder.php"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ id: state.itemID, ready: state.ready }))
  }

  render() {

    const { orderToEdit } = this.context

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
            <Text style={styles.pageTitle}>EDIT ORDER: </Text>
          </View>
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Name"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            value = {this.state.name}
            onChangeText = {name => this.nameOnChange(name)}
          />
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Date"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            value = {this.state.date}
            onChangeText = {date => this.dateOnChange(date)}
          />
          <Picker
              selectedValue={parseInt(this.state.ready)}
              style={ styles.picker }
              onValueChange={(itemValue, itemIndex) => this.readyOnChange(itemValue)}
            >
              <Picker.Item label="Yes" value={1} />
              <Picker.Item label="No" value={0} />
            </Picker>
          <Button onPress={() => this.updateItem()} block style={styles.submitButton}>
              <Text style={{color: "white", fontWeight: "bold"}}>UPDATE</Text>
          </Button>

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
  picker: {
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 8,
    marginTop: 16,
  },
  pageTitleWrap: {
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  statusBar: {
    backgroundColor: '#FFCE00',
    height: 20
  },
  header: {
    backgroundColor: '#FF9999',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 8,
    marginTop: 16
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginTop: 24
  }
})