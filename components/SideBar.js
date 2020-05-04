import React from "react";
import { Text, AsyncStorage, TouchableOpacity } from "react-native";
// note when pulling in Text component from native-base, it gives a uppercase prop error
import { Container, Content, Left, Right, Icon, List, ListItem } from "native-base";

export default class SideBar extends React.Component {

  logOut = async function() {
      try {
          const keys = await AsyncStorage.getAllKeys();
          await AsyncStorage.multiRemove(keys);
          setTimeout(() => {
            //_this.props.navigation.navigate('Home');
            window.location.reload();
          }, 1500);
      } catch (error) {
          console.error('Error clearing app data.');
      }
  }

  render() {
    return (
      <List>
        <ListItem selected>
          <Left>
            <Text>Home</Text>
          </Left>
          <Right>
            <Icon type="FontAwesome" name="home" />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
          <Text>Start Order</Text>
          </Left>
          <Right>
            <Icon type="MaterialCommunityIcons" name="format-list-checkbox" />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
          <Text>My Account</Text>
          </Left>
          <Right>
            <Icon type="FontAwesome" name="user" />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <TouchableOpacity onPress={() => {this.logOut()}}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </Left>
          <Right>
            <Icon type="FontAwesome" name="lock" />
          </Right>
        </ListItem>
      </List>
    );
  }
}
