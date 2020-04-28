import React from 'react';
import {StyleSheet, Text, View, Platform, FlatList} from 'react-native';
import Header from '../Header';
import NavBar from '../NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {FaPhone} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import ReactDOM from "react-dom";

export default class StartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: '',
      styles: {
        marginTop: 8
      },
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

  isLoggedIn() {
    let user = localStorage.getItem("user");
    return user ? true : false
  }

  componentDidMount() {
    // setState({ contentHeight: measureElement(this.content).height });
    // this.adjustGap();
    var node = ReactDOM.findDOMNode(this.refs["appHeader"]);
    this.setState({
      styles: {
        marginTop: node.offsetHeight
      }
    });
  }

  render() {

    let continueButtonPage = this.isLoggedIn() ? "StartPickup" : "Login";

    return (
      <View style={styles.container}>
        <Header
          interior={true}
          navigation={this.props.navigation}
          title="Start Pickup Order"
          ref="appHeader"/>

        <Image style={this.state.styles} src={require('../../assets/img/map.png')}/>

        <Container>
          <Row>
            <Col>
              <div className="mt-3">
                114 Raven Cir,
                <br/>
                Kings Mountain, NC 28086
              </div>

              <div className="mt-1">
                <div className="c-primary">
                  <FaPhone size={16} className="mr-2"/>
                  (704) 739-4424
                </div>
                <Button
                  className="mt-5 t-bold"
                  onClick={() => this.props.navigation.navigate(continueButtonPage)}
                  variant="primary"
                  size="lg"
                  block>START PICKUP ORDER</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  adjustGap: {
    marginTop: 0
  }
});