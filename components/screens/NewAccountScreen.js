import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import MenuDrawer from 'react-native-side-drawer'
import { Button } from 'native-base';
// custom components
import Header from '../Header';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import ReactDOM from "react-dom";
import { globals, componentStyles, colors, spacingStyles } from '../GlobalStyles';

export default class NewAccount extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: '',
      open: false,
      email: "",
      password: "",
      phone: "",
      styles: {
        marginTop: 8
      },
    }

    this.toggleOpen = this.toggleOpen.bind(this);
    
  }

  componentDidMount() {
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

  processAccountCreation() {
    console.log(this.state)
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
            <Text style={styles.pageTitle}>Create Account</Text>
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
            placeholder = "Enter Phone"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            onChangeText = {phone => this.phoneOnChange(phone)}
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
              <Text style={{color: "white", fontWeight: "bold"}}>CREATE ACCOUNT</Text>
          </Button>
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