import React from 'react';
import {StyleSheet, Text, View, Platform, FlatList} from 'react-native';

// bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

// core components for layout
import Header from '../Header';
import InputBar from '../InputBar';
import TodoItem from '../TodoItem';
import NavBar from '../NavBar';

// this is a class based component that has a state
/* export default class Header extends React.Component {

} */

export default class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: '',
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

  render() {
    // ios, web, android place objects inside the return <view> in brackets {}
    const statusBar = (Platform.OS == 'web')
      ? <View style={styles.statusBar}></View>
      : <View></View>;

    return (
      <View style={styles.container}>
        <NavBar class="app-header-main" navigation={this.props.navigation}/>

        <Header interior={false} navigation={this.props.navigation} title="Kings Mountain"/>

        <div className="flex-grow-1 bg-primary-light">
          <Image src={require('../../assets/img/popcorn.gif')}/>
        </div>

        <Container className="bg-primary-light">
          <Row>
            <Col>
              <Button
                className="w-medium"
                onClick={() => this.props.navigation.navigate('Start')}
                variant="white"
                size="lg"
                block>START NEW ORDER</Button>
            </Col>
          </Row>
          <Container>
            <Row>
              <Col className="text-center pv-1">
                <strong className="ml-4" onClick={() => this.props.navigation.navigate('Login')}>Login</strong>
              </Col>
              <Col className="text-center pv-1">
                <strong className="mr-4">Join</strong>
              </Col>
            </Row>
          </Container>
        </Container>

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