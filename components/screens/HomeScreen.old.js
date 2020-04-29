import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import ReactDOM from "react-dom";
// core components for layout
import Header from '../Header';
import NavBar from '../NavBar';

//storage
import { AsyncStorage } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: '',
      dimensions: null,
      styles: {
        marginTop: 8
      },
      user: null,
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

  isLoggedIn() {
    // let user = localStorage.getItem("user");
    // return user != 'null' ? true : false
  }

  render() {
    // ios, web, android place objects inside the return <view> in brackets {}
    const statusBar = (Platform.OS == 'web')
      ? <View style={styles.statusBar}></View>
      : <View></View>;
    const userButtons = this.state.user == null ? <Container>
    <Row>
      <Col className="text-center pb-3">
        <strong className="ml-4" onClick={() => this.props.navigation.navigate('Login')}>Login</strong>
      </Col>
      <Col className="text-center pb-3">
        <strong className="mr-4" onClick={() => this.props.navigation.navigate('NewAccount')}>Join</strong>
      </Col>
    </Row>
  </Container> : '';

    let navigationPage = this.isLoggedIn() ? "Start" : "Login";

    return (
      <View style={styles.container}>
        <NavBar navigation={this.props.navigation} />

        <Header style={this.state.styles} interior={false} navigation={this.props.navigation} title="Kings Mountain"/>

        <div className="flex-grow-1 bg-primary-light">

        </div>

        <Container className="bg-primary-light">
          <Row>
            <Col>
              <Button
                className="w-medium mb-2"
                onClick={() => this.props.navigation.navigate(navigationPage)}
                variant="white"
                size="lg"
                block>START NEW ORDER</Button>
            </Col>
          </Row>
          {userButtons}
        </Container>

      </View>
    );
    // <Text>{this.state.todoInput}</Text> inside <View>
  }

  componentDidMount() {
    // let user = JSON.parse(localStorage.getItem("user"));
    // this.setState({ user: user });
    // var node = ReactDOM.findDOMNode(this.refs["appNavBar"]);
    // this.setState({ styles: { marginTop: node.offsetHeight }});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
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