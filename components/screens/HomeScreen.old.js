import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Drawer from 'react-native-drawer';
import SideBar from '../SideBar';
import GlobalStyles from '../../src/constants/GlobalStyles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isOpen: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header style={GlobalStyles.appHeader}>
          <Left>
            <Button style={GlobalStyles.headerButton} transparent>
              <Icon type="MaterialCommunityIcons" name='movie-roll' />
            </Button>
          </Left>
          <Body>
            <Title>Hounds Drive In</Title>
          </Body>
          <Right>
            <Button onPress={this.toggleControlPanel} transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}
