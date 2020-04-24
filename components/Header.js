import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import {ArrowLeftShort} from 'react-bootstrap-icons';

// this is a class based component that has a state
/* export default class Header extends React.Component {

} */

// this is a stateless header, component props is an object of the properties
// passed in from App.js
const Header = (props) => {
  let headerClass = props.interior
    ? 'app-header-main app-header-main--interior'
    : 'app-header-main';
  return (
    <div className={headerClass}>
      <View>
        <div className="pv-sm">
          <Container>
            <Row>
              {(!props.interior)
                ? <Col></Col>
                : <Col><ArrowLeftShort
                  onClick={() => props.navigation.goBack()}
                  size={32}
                  className="mr-2"/></Col>
}
              <Col className="text-center" xs={6}>
                <Text>
                  <div className="app-heading">{props.title}</div>
                </Text>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      </View>
    </div>
  )
}

export default Header;