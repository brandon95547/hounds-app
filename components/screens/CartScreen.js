import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import SideBar from '../SideBar'
import { globals, componentStyles, colors } from '../GlobalStyles'
import UserContext from '../../UserContext'

import mapImage from '../../assets/img/map.png'

const dimensions = Dimensions.get('window')
const imageHeight = Math.round(dimensions.width * 9 / 16)
const imageWidth = dimensions.width

export default class CartScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      open: false,
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  static contextType = UserContext

  async componentDidMount() {
    const { user, cartTotal, setUser, isLoggedIn } = this.context
    isLoggedIn()
    
    this.setState({ assetsLoaded: true })
    this.getCartItems()
  }

  getCartItems = () => {
    const { cartData, setCartData } = this.context

    const foodItems = cartData.filter(item => item !== null)
    let items = []
    let total = 0

    foodItems.forEach((subItem, subIndex) => {
      if(parseInt(subItem.quantity) != 0) {
        total += (subItem.price * parseInt(subItem.quantity))
        items.push([subItem.title, '$' + parseFloat(subItem.price).toFixed(2), parseInt(subItem.quantity)])
      }
    })

    const cartTable = items.length > 0 ? <><Table>
    <Row data={["Item", "Price", "Quantity"]} style={styles.tableHeading} textStyle={styles.rowTextStyle}/>
      {
        items.map((rowData, rowIndex) => (
          <TableWrapper key={rowIndex} style={styles.tableWrapper}>
            {
              rowData.map((cellData, cellIndex) => (
                <Cell key={cellIndex} data={cellData} textStyle={styles.rowTextStyle}/>
              ))
            }
          </TableWrapper>
        ))
      }
    </Table><View style={{alignItems: "flex-end"}}><Text style={styles.fee}>Convenience Fee: .30 cents</Text>
    <Text>Total: ${total.toFixed(2)}</Text></View></> : <View><Text>Nothing has been added to the cart.</Text></View>

    return (cartTable)
  }

  drawerContent = () => {
    return (
      <TouchableOpacity style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    )
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }

  render() {
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

            {this.getCartItems()}
            
            <Button style={componentStyles.primaryButton} block onPress={() => this.props.navigation.navigate("Checkout")}>
              <Text style={{color: "white", fontWeight: "bold"}}>PROCEED TO CHECKOUT</Text>
            </Button>
          </View>
          

      </MenuDrawer>
    )
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
})