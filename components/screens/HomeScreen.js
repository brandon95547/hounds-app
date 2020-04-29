import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Drawer from 'react-native-drawer';
import SideBar from '../SideBar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isOpen: false
    };
  }
  toggleControlPanel = () => {
    if(this.state.isOpen) {
      this.closeControlPanel()
    } else {
      this.openControlPanel()
    }
  }
  closeControlPanel = () => {
    this._drawer.close()
    this.setState({ isOpen: false });
  };
  openControlPanel = () => {
    this._drawer.open()
    this.setState({ isOpen: true });
  };

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
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button onPress={this.toggleControlPanel} transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Drawer
        open={false} 
        ref={(ref) => this._drawer = ref} 
        content={<SideBar />}
        >
        
      </Drawer>
      </Container>
    );
  }
}
