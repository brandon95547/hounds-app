import React from 'react';
import {StyleSheet, Text, View, Platform, FlatList} from 'react-native';
// custom components
import Header from '../Header';
import NavBar from '../NavBar';

export default class StartPickupScreen extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          interior={true}
          navigation={this.props.navigation}
          title="Login"
          styles={styles}/>

      </View>
    );
    // <Text>{this.state.todoInput}</Text> inside <View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});