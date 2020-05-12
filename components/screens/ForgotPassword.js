import React from 'react'
import { Vibration, Platform, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, TextInput, AsyncStorage, Picker, AppState } from 'react-native'
import MenuDrawer from 'react-native-side-drawer'
import { Button } from 'native-base'
// custom components
import Header from '../Header'
import NavBar from '../NavBar'
import SideBar from '../SideBar'
import RaptorToast from '../RaptorToast'
import ReactDOM from "react-dom"
import { globals, componentStyles, colors, spacingStyles } from '../GlobalStyles'
import UserContext from '../../UserContext'
import { Notifications } from 'expo'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      email: "",
      seconds: 5,
      expoPushToken: "",
      notification: {},
    }

    this.toggleOpen = this.toggleOpen.bind(this)
    
  }

  static contextType = UserContext

  componentDidMount() {
    // this.checkMultiPermissions()
  }
  
  componentWillUnmount() {

  }

  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = existingStatus
    if (existingStatus !== granted) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== granted) {
      return false
    }
    return true
  }

  async checkMultiPermissions() {
    const { status, expires, permissions } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
      Permissions.CONTACTS
    )

    console.log('status')
    console.log(status)
    console.log('expires')
    console.log(expires)
    console.log('permissions')
    console.log(permissions)

    if (status !== 'granted') {
      alert('Hey! You have not enabled selected permissions')
    }
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = await Notifications.getExpoPushTokenAsync()
      console.log(token)
      this.setState({ expoPushToken: token })
    } else {
      alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      })
    }
  }

  _handleNotification = notification => {
    Vibration.vibrate()
    console.log(notification)
    this.setState({ notification: notification })
  }

  sendNotificationImmediately = async () => {
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: 'This is crazy',
      body: 'Your mind will blow after reading this',
    })
    console.log(notificationId) // can be saved in AsyncStorage or send to server
  }

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    )
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }

  processForgotPassword() {
    let _this = this
    const { user, setUser } = this.context
    // if the email isn't valid
    if(!this.emailIsValid(this.state.email)) {
      this.refs.childToast.showToast(colors.green, "Invalid email")
      return
    }

    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        
        _this.refs.childToast.showToast(response.success ? colors.green : colors.failure, response.message)
        // localStorage.setItem('user', response.user)
        // match the timeout from show alert before switching pages because the component will not be available to setState, if not
        if(response.success) {
          setTimeout(() => {
            _this.props.navigation.navigate('Login')
          }, 2500)
        }
      }
    }

    var theUrl = "http://bluechipadvertising.com/signup.php?request=forgotPassword"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({email: this.state.email}))

  }

  emailOnChange(email) {
    this.setState({ email: email })
  }

  emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  render() {
    const Toast = <RaptorToast ref="childToast" showToast={true} message="my message" speed={1000} direction="top" />

    return (
      <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={65}
          animationTime={250}
          overlay={true}s
          opacity={0.4}
        >   

       

        <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
        
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around',}}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Origin: {this.state.notification.origin}</Text>
            <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
          </View>
          <Button title={'Press to Send Notification'} onPress={() => this.sendNotificationImmediately()} />
        </View> */}

        <View style={styles.container}>
          <View style={styles.pageTitleWrap}>
            <Text style={styles.pageTitle}>Forgot Password</Text>
          </View>
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Enter Email"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            onChangeText = {email => this.emailOnChange(email)}
          />
          <Button onPress={() => this.processForgotPassword()} block style={styles.submitButton}>
              <Text style={{color: "white", fontWeight: "bold"}}>Submit</Text>
          </Button>
          
          {Toast}

        </View>

        </MenuDrawer>
    )
    // <Text>{this.state.todoInput}</Text> inside <View>
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