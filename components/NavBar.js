import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Film} from 'react-bootstrap-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';


export default class Header extends React.Component {
  constructor() {
    super();

  }

  /* fixGap() {
    // console.log(this.measureElement(this));
    this.props.fixGap(this.measureElement(this));
  }

  measureElement = element => {
    const DOMNode = ReactDOM.findDOMNode(element);
    return {width: DOMNode.offsetWidth, height: DOMNode.offsetHeight};
  } */

  componentDidMount() {
    // let user = JSON.parse(localStorage.getItem("user")); this.setState({ user:
    // user });
  }

  render() {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        expand="xl"
        className="ins-app-navbar ins-app-navbar--main bgg-primary">
        <Navbar.Brand onClick={() => this.props.navigation.navigate('Home')}><Film className="mr-2"/>
          Hounds Drive-In</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Account</Nav.Link>
            <Nav.Link href="#link">Orders</Nav.Link>
            <Nav.Link href="#link">Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowColor: '#171717',
    shadowOpacity: .1
  }
});