import React from 'react';
import {StyleSheet, Text, View, Platform, FlatList} from 'react-native';
import Header from '../Header';
import InputBar from '../InputBar';
import TodoItem from '../TodoItem';
import NavBar from '../NavBar';

// this is a class based component that has a state
/* export default class Header extends React.Component {

} */

export default class StartScreen extends React.Component {
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
        <NavBar navigation={this.props.navigation} />

        <Header title="Page 2"/>

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
  }
});