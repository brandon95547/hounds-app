import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Left, Right, Icon, Drawer, Container, Button } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import SideBar from '../SideBar';
import { globals, componentStyles, colors } from '../GlobalStyles';
import ReactDOM from "react-dom";
import * as Font from 'expo-font';

import mapImage from '../../assets/img/map.png';

export default class CartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      assetsLoaded: false,
      todoInput: '',
      open: false,
      styles: {
        marginTop: 8
      },
      cartData: [],
      cartTotal: 0
    }

    this.toggleOpen = this.toggleOpen.bind(this);

  }

  isLoggedIn() {
    // let user = localStorage.getItem("user");
    // return user ? true : false
  }

  async componentDidMount() {
    /* await Font.loadAsync({
        'poppins-normal': require('../../assets/fonts/Poppins_400_normal.ttf')
    });
    this.setState({ assetsLoaded: true }); */
    // setState({ contentHeight: measureElement(this.content).height });
    // this.adjustGap();
    /* var node = ReactDOM.findDOMNode(this.refs["appHeader"]);
    this.setState({
      styles: {
        marginTop: node.offsetHeight
      }
    }); */
    this.getCartItems()
  }

  async getCartItems() {
    let returnValue = null
    try {
      // empy cart on page load
      const value = await AsyncStorage.getItem('cart-items');
      if (value !== null) {
        // We have data!!
        returnValue = value
        const items = []
        const foodItems = JSON.parse(returnValue).filter(person => person !== null)
        
        let total = 0
        foodItems.forEach((subItem, subIndex) => {
          if(parseInt(subItem.quantity) != 0) {
            total += (subItem.price * parseInt(subItem.quantity))
            items.push([subItem.title, '$' + parseFloat(subItem.price).toFixed(2), parseInt(subItem.quantity)])
          }
        })

        this.setState({ cartData: items, cartTotal: total })

      }
    } catch (error) {
      // Error retrieving data
    }
  }

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    );
  };

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {

    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width;

    const cartTable = this.state.cartData.length > 0 ? <Table>
    <Row data={["Item", "Price", "Quantity"]} style={styles.tableHeading} textStyle={styles.rowTextStyle}/>
    {
      this.state.cartData.map((rowData, rowIndex) => (
        <TableWrapper key={rowIndex} style={styles.tableWrapper}>
          {
            rowData.map((cellData, cellIndex) => (
              <Cell key={cellIndex} data={cellData} textStyle={styles.rowTextStyle}/>
            ))
          }
        </TableWrapper>
      ))
    }
  </Table> : <View><Text>Nothing has been added to the cart.</Text></View>

  const proceedButton = this.state.cartData.length > 0 ? <Button style={componentStyles.primaryButton} block onPress={() => this.props.navigation.navigate("Checkout")}>
  <Text style={{color: "white", fontWeight: "bold"}}>PROCEED TO CHECKOUT</Text>
</Button> : <Button style={componentStyles.primaryButton} block onPress={() => this.props.navigation.navigate("StartPickup")}>
  <Text style={{color: "white", fontWeight: "bold"}}>START PICKUP ORDER</Text>
</Button>

    return (
      <MenuDrawer 
        open={this.state.open} 
        drawerContent={this.drawerContent()}
        drawerPercentage={65}
        animationTime={250}
        overlay={true}
        opacity={0.4}
      >   
          <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
          
          <View style={styles.container}>
            <View style={styles.pageTitleWrap}>
              <Text style={styles.pageTitle}>Review Order</Text>
            </View>

            {cartTable}
            <Text style={styles.fee}>
              Convenience Fee: .30 cents
            </Text>
            <Text style={styles.totals}>
              Total: ${parseFloat(this.state.cartTotal + .3).toFixed(2)}
            </Text>

            {proceedButton}
          </View>
          

      </MenuDrawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  fee: {
    textAlign: "right",
    paddingRight: 4,
    fontSize: 15,
    marginTop: 16,
  },
  totals: {
    textAlign: "right",
    paddingRight: 4,
    fontSize: 17,
    marginTop: 16,
    fontWeight: "bold"
  },
  rowTextStyle: {
    fontSize: 17
  },
  tableWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 18
  },
  tableHeading: {
    backgroundColor: "#EEE",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 18
  }, 
  pageTitleWrap: {
    marginBottom: 24
  },
  pageTitle: {
    fontSize: 17,
    fontWeight: "bold"
  },
  adjustGap: {
    marginTop: 0
  }
});