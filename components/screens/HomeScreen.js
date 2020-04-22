import React from 'react';
import { StyleSheet, Text, View, Platform, FlatList } from 'react-native';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

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
        <NavBar navigation={this.props.navigation}/>

        <Header title="Kings Mountain"/>

        <Container>
          <Row>
            <Col>1 of 1</Col>
          </Row>
        </Container>

        <Button
          title="START NEW ORDER"
          onPress={() => this.props.navigation.navigate('Start')}/>
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
  }
});