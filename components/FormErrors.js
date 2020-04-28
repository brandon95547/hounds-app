import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Alert from "react-bootstrap/Alert";

export default class FormErrors extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View>
        <Alert variant={this.props.status.variant} show={this.props.status.show}>
          {this.props.status.message}
        </Alert>
      </View>
    )
  }
}