import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import {ArrowLeftShort} from 'react-bootstrap-icons';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: '',
      user: null,
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
    let headerClass = this.props.interior
    ? 'app-header-main app-header-main--interior'
    : 'app-header-main';
    // ios, web, android place objects inside the return <view> in brackets {}
    return (
      <div className={headerClass}>
      <View style={this.props.style}>
        <div className="pv-sm">
          <Container>
            <Row>
              {(!this.props.interior)
                ? <Col></Col>
                : <Col><ArrowLeftShort
                  onClick={() => this.props.navigation.goBack()}
                  size={32}
                  className="mr-2"/></Col>
}
              <Col className="text-center" xs={6}>
                <Text>
                  <div className="app-heading">{this.props.title}</div>
                </Text>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      </View>
    </div>
    );
    // <Text>{this.state.todoInput}</Text> inside <View>
  }

  componentDidMount() {
    //let user = JSON.parse(localStorage.getItem("user"));
    //this.setState({ user: user });
  }

}