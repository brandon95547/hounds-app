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

  navigateTo = () => {
    const { cartData, setCartData } = this.context
    return cartData.length > 0 ? (<Button style={styles.primaryButton} block onPress={() => this.props.navigation.navigate("Checkout")}><Text style={{color: "white", fontWeight: "bold"}}>PROCEED TO CHECKOUT</Text></Button>) : (<Button style={styles.primaryButton} block onPress={() => this.props.navigation.navigate("StartPickup")}><Text style={{color: "white", fontWeight: "bold"}}>START PICKUP ORDER</Text></Button>)
  }

  getCartItems = () => {
    const { cartData, setCartData } = this.context

    const foodItems = cartData.filter(item => item !== null)
    let items = []
    let total = .30

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
    <Text style={{...componentStyles.money, ...componentStyles.textNode}}>Total: ${total.toFixed(2)}</Text></View></> : <View><Text style={{ fontSize: 16 }}>Nothing has been added to the cart.</Text></View>

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
            {this.navigateTo()}
            
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
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16
  },
  rowTextStyle: {
    fontSize: 16
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
  },
  primaryButton: {
    backgroundColor: colors.primary,
    width: "75%",
    alignSelf: "center",
    marginTop: 50
  },
})