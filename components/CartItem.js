import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

export default class CartItem extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View>
        <div>
            <p>{this.props.item.title}</p>
            <p>${this.props.item.val}</p>
        </div>
      </View>
    )
  }
}