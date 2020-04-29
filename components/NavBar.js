import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';



export default class Header extends React.Component {
  constructor() {
    super();

  }


  logOut() {

  }

  componentDidMount() {
    // let user = JSON.parse(localStorage.getItem("user")); this.setState({ user:
    // user });
  }

  render() {
    return (
        <React.Fragment>
            <Text>hello</Text>
        </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowColor: '#171717',
    shadowOpacity: .1
  }
});