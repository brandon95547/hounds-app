import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, TextInput, AsyncStorage } from 'react-native';
import MenuDrawer from 'react-native-side-drawer'
import { Button } from 'native-base';
// custom components
import Header from '../Header';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import RaptorToast from '../RaptorToast';
import ReactDOM from "react-dom";
import { globals, componentStyles, colors, spacingStyles } from '../GlobalStyles';

export default class LoginScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      email: "",
      password: "",
      phone: ""
    }

    this.toggleOpen = this.toggleOpen.bind(this);
    
  }

  componentDidMount() {
  }

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
        <SideBar />
      </TouchableOpacity>
    );
  };

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  emailOnChange(email) {
    this.setState({ email: email })
  }

  phoneOnChange(phone) {
    this.setState({ phone: phone })
  }

  passwordOnChange(password) {
    this.setState({ password: password })
  }

  _storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      // Error saving data
    }
  };

  processAccountCreation() {
    let _this = this
    // if the email isn't valid
    if(!this.emailIsValid(this.state.email)) {
      this.refs.childToast.showToast(colors.green, "Invalid email")
      return
    }

    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        
        _this.refs.childToast.showToast(response.success ? colors.green : colors.failure, response.message)
        // localStorage.setItem('user', response.user);
        // match the timeout from show alert before switching pages because the component will not be available to setState, if not
        if(response.success) {
          _this._storeData("user", response.user)
          setTimeout(() => {
            //_this.props.navigation.navigate('Home');
            window.location.reload();
          }, 2500);
        }
      }
    };

    var theUrl = "http://bluechipadvertising.com/signup.php";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({email: this.state.email, password: this.state.password, createAccount: false, phone: this.state.phone}));

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
          overlay={true}
          opacity={0.4}
        >   

        <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
        

        <View style={styles.container}>
          <View style={styles.pageTitleWrap}>
            <Text style={styles.pageTitle}>Login</Text>
          </View>
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Enter Email"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            onChangeText = {email => this.emailOnChange(email)}
          />
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Password"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            secureTextEntry = {true}
            onChangeText = {password => this.passwordOnChange(password)}
          />
          <Button onPress={() => this.processAccountCreation()} block style={styles.submitButton}>
              <Text style={{color: "white", fontWeight: "bold"}}>LOGIN</Text>
          </Button>

          {Toast}

        </View>

        </MenuDrawer>
    );
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
    fontSize: 17,
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
});