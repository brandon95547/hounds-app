import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Alert from "react-bootstrap/Alert";

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.message
    }
  }

  render() {
    return (
      <View>
        <Alert variant="success" show={this.props.status.show}>
          {this.state.message}
        </Alert>
      </View>
    )
  }
}