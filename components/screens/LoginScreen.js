import React from 'react';
import {StyleSheet, Text, View, Platform, FlatList} from 'react-native';
import Header from '../Header';
import InputBar from '../InputBar';
import TodoItem from '../TodoItem';
import NavBar from '../NavBar';

export default class LoginScreen extends React.Component {
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
    return (
      <View style={styles.container}>
        <Header interior={true} navigation={this.props.navigation} title="Login" styles={styles} />

        <InputBar
          textChange={todoInput => this.setState({todoInput})}
          addNewTodo={() => this.addNewTodo()}/>

        <FlatList
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
          return (<TodoItem TodoItem={item}/>)
        }}/>
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