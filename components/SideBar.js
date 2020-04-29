import React from "react";
import { Text } from "react-native";
// note when pulling in Text component from native-base, it gives a uppercase prop error
import { Container, Content, Left, Right, Icon, List, ListItem } from "native-base";

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
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
              <Text>My Account</Text>
              </Left>
              <Right>
                <Icon type="FontAwesome" name="user" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Logout</Text>
              </Left>
              <Right>
                <Icon type="FontAwesome" name="lock" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
