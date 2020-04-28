import React from 'react';
import {StyleSheet, Text, View, Platform, FlatList} from 'react-native';
// custom components
import Header from '../Header';
import NavBar from '../NavBar';
import ReactDOM from "react-dom";
import SignupForm from '../SignupForm';

export default class NewAccount extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: '',
      styles: {
        marginTop: 8
      },
      todos: [
        {
          id: 1,
          title: 'my title 1',
          done: false
        }, {
          id: 2,
          title: 'my title 2',
          done: false
        }
      ]
    }
  }

  componentDidMount() {
    var node = ReactDOM.findDOMNode(this.refs["appHeader"]);
    this.setState({
      styles: {
        marginTop: node.offsetHeight
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          interior={true}
          navigation={this.props.navigation}
          title="New Account"
          ref="appHeader"
          styles={styles}/>

          <SignupForm newAccount={true} style={this.state.styles} navigation={this.props.navigation} />
      </View>
    );
    // <Text>{this.state.todoInput}</Text> inside <View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    /*     alignItems: 'center',
      justifyContent: 'center', */
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
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase'
  }
});