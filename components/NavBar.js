import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Film } from 'react-bootstrap-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const NavBar = (props) => {
    return (
        <Navbar bg="dark" variant="dark" expand="xl" className="ins-app-navbar ins-app-navbar--main bgg-primary">
            <Navbar.Brand onClick={() => props.navigation.navigate('Home')}><Film className="mr-2" /> Hounds Drive-In</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
    /* return (
        <View style={styles.inputContainer}>
            <Navbar bg="dark" variant="dark" expand="xl" className="ins-app-navbar ins-app-navbar--main bgg-primary">
                <Navbar.Brand href="#home">Hounds Drive-In</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Account</Nav.Link>
                    <Nav.Link href="#link">Orders</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </View>
    ) */
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#171717',
        shadowOpacity: .1
    }
});

export default NavBar;