import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Picker, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors } from '../GlobalStyles'
import UserContext from '../../UserContext'
import * as Print from 'expo-print';

export default class EditOrderScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      open: false,
      itemID: 0,
      name: "",
      ready: 0,
      showUpdateButton: true
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  static contextType = UserContext

  componentDidMount() {
    const { orderToEdit } = this.context
    this.setState({ name: orderToEdit[0] })
    // this.setState({ date: orderToEdit[1] })
    // this.setState({ category: orderToEdit[2] })
    this.setState({ itemID: orderToEdit[1] })
    this.setState({ ready: orderToEdit[3] })
    // this.setState({ isAvailable: orderToEdit[4] })
  }

  print = (id, name) => {
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        // let response = this.responseText
        console.log(response)
        let printHtml = '<div>Order ID: ' + id + '</div>'
        printHtml += '<div>Name: ' + name + '</div>'
        response.items.map((rowData, rowIndex) => (
          printHtml += '<div>Item: ' + rowData.title + ', Quantity: ' + rowData.quantity + '</div>'
        ))
        printHtml += '<div>Paid with PayPal</div>'
        printHtml += '<div>Amt Paid: ' + response.amt + '</div>'
        console.log(printHtml);
        Print.printAsync(
          {html: printHtml}
        )
      }
    }

    var theUrl = "http://bluechipadvertising.com/getReceipt.php?id=" + id
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ action: "get-items" }))
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
    _this.setState({ showUpdateButton: false });
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        _this.setState({ showUpdateButton: true });
        if(response.success) {
          // _this.getFoodItems()
          Alert.alert(
            'Alert',
            "Update successful",
            [
              /* { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') }, */
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              { text: 'OK', onPress: () => {} },
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
                onPress: () => {},
                style: 'cancel',
              },
              { text: 'OK', onPress: () => {} },
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
          
          <ScrollView style={{...componentStyles.paddingBox, ...colors.bgWhite}}>
          <View style={styles.pageTitleWrap}>
            <Text style={styles.pageTitle}>EDIT ORDER: </Text>
          </View>
          <View>
            <Button light onPress={() => this.print(orderToEdit[1], orderToEdit[0])} style={{marginTop: 16, paddingRight: 14}} iconLeft>
              <Icon style={{color: "#111"}} name='print' />
              <Text style={{ color: "#333" }}>Print Order</Text>
            </Button>
          </View>
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Name"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            value = {this.state.name}
            onChangeText = {name => this.nameOnChange(name)}
          />
          <Picker
              selectedValue={parseInt(this.state.ready)}
              style={ styles.picker }
              onValueChange={(itemValue, itemIndex) => this.readyOnChange(itemValue)}
            >
              <Picker.Item label="Yes" value={1} />
              <Picker.Item label="No" value={0} />
            </Picker>
          {this.state.showUpdateButton && 
          <Button onPress={() => this.updateItem()} block style={styles.submitButton}>
              <Text style={{color: "white", fontWeight: "bold"}}>UPDATE</Text>
          </Button>
          }
          {!this.state.showUpdateButton && 
          <ActivityIndicator size="large" color="#0000ff" />
          }

        </ScrollView>

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