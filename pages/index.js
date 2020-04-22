import React from 'react';

// the platform component detects device info, is this Android, etc...
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../components/Header';
import InputBar from '../components/InputBar';
import TodoItem from '../components/TodoItem';
import NavBar from '../components/NavBar';

export default class App extends React.Component {
  constructor () {
    super();

    this.state = {
      todoInput: '',
      todos: [
        { id: 1, title: 'my title 1', done: false },
        { id: 2, title: 'my title 2', done: false }
      ]
    }
  }

  addNewTodo () {
    let todos = this.state.todos;

    todos.unshift({
      id: todos.length + 1,
      title: this.state.todoInput,
      done: false
    });

    this.setState({
      todos,
      todoInput: ''
    });

    console.log(this.state);
  }

  render() {
    // ios, web, android
    // place objects inside the return <view> in brackets {}
    const statusBar = (Platform.OS == 'web') ? <View style={styles.statusBar}></View> : <View></View>;

    return (
      <View style={styles.container}>
        <NavBar />

        <Header title="Kings Mountain" />

        <InputBar 
          textChange={todoInput => this.setState({ todoInput })} 
          addNewTodo={() => this.addNewTodo()} 
        />

        <FlatList
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ ({item, index}) => {
            return (
              <TodoItem TodoItem={item} />
            )
          } }
        />
      </View>
    );
    // <Text>{this.state.todoInput}</Text> inside <View>
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    backgroundColor: '#FFCE00',
    height: 20
  }
});