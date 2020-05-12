import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Icon, Button } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import { globals, componentStyles, colors } from '../GlobalStyles';
import UserContext from '../../UserContext'

export default class OrderSuccess extends React.Component {
  constructor() {
    super();

    this.state = {
      assetsLoaded: false,
      open: false,
      items: [],
      total: 0,
      tax: 0
    }

    this.toggleOpen = this.toggleOpen.bind(this);

  }

  static contextType = UserContext

  componentDidMount() {
    // this.sendOrderNumber()
    let _this = this
    const { orderID } = this.context
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)

        let foodItems = JSON.parse(response.order.food_order_items)
        foodItems = foodItems.items.filter(item => item !== null && item.quantity != 0)
        _this.setState({ items: foodItems })

        let total = 0
        foodItems.forEach((subItem, subIndex) => {
          total += (subItem.price * parseInt(subItem.quantity))
        })
        let tax = Math.ceil((total * .0657) * 100)/100
        total = (.30 + total + Math.ceil((total * .0657) * 100)/100)
        _this.setState({ total: total })
        _this.setState({ tax: tax })
        
        // console.log(foodItems.items)
        
        // _this.refs.childToast.showToast(response.success ? colors.green : colors.failure, response.message)
        // localStorage.setItem('user', response.user)
        // match the timeout from show alert before switching pages because the component will not be available to setState, if not
        if(response.success) {
          // set user state from context
          // setUser(JSON.parse(response.user))
          setTimeout(() => {
            // _this.props.navigation.navigate('Home')
          }, 1500)
        }
      }
    }

    var theUrl = "http://bluechipadvertising.com/retrieve_order.php"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ order_id: orderID }))

  }

  generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 6);
  }

  sendOrderNumber() {
    var _this = this
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        
        // _this.refs.childToast.showToast(response.success ? colors.green : colors.failure, response.message)
        // localStorage.setItem('user', response.user);
        // match the timeout from show alert before switching pages because the component will not be available to setState, if not
        if(response.success) {
          // _this._storeData("user", response.user)
          // set user state from context
          // setUser(JSON.parse(response.user))
          // setTimeout(() => {
          //   _this.props.navigation.navigate('Home');
          // }, 1500);
        }
      }
    }

    var theUrl = "http://bluechipadvertising.com/generateOrder.php";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({orderNumber: _this.generateRandomString() }));

  }

  drawerContent = () => {
    return (
      <TouchableOpacity style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    );
  };

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { checkoutCart, orderID } = this.context
    console.log(this.state.items)
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
          
          <ScrollView style={styles.container}>
            <View>
              <Text style={styles.title}>IN-STORE PICKUP INSTRUCTIONS</Text>
            </View>
            <View style={styles.subHeading}>
              <View>
                <Text style={styles.textSmall}>Pickup</Text>
                <Text style={styles.textSmall}>Location</Text>
              </View>
              <View style={styles.stepDetailText}><Text style={styles.textSmall}>114 Raven Cir,</Text>
              <Text style={styles.textSmall}>Kings Mountain, NC 28086</Text></View>
            </View>
            <View style={styles.steps}>
              <View style={styles.step}>
                <Text>
                  <Text style={componentStyles.circle}>1</Text>
                </Text>
                <Text style={styles.text}>When your order is ready, you will receive an email and a push notification.</Text>
              </View>
              <View style={styles.step}>
                <Text>
                  <Text style={componentStyles.circle}>2</Text>
                </Text>
                <Text style={styles.text}>Share your name and order number with the employee at the counter.</Text>
              </View>
              <View style={styles.step}>
                <Text>
                  <Text style={componentStyles.circle}>3</Text>
                </Text>
                <Text style={styles.text}>Enjoy!</Text>
              </View>
              </View>
              <View style={styles.subHeading2}>
                <View>
                  <Text style={styles.text}><Text style={styles.bold}>Order Name:</Text> John Doe</Text>
                  <Text style={styles.text}><Text style={styles.bold}>Order Number:</Text> 013</Text>
                </View>
              </View>
              <View style={{ marginTop: 16 }}>
                <Text style={styles.heading}>Order Details</Text>
              </View>
              {
                this.state.items.map((subItem, subIndex) => {
                  return (<View key={subIndex} style={styles.stepDetail}><Text style={{ fontSize: 15 }}>{subItem.title} (x{subItem.quantity})</Text><Text style={styles.stepDetailText}>${(subItem.price * subItem.quantity).toFixed(2)}</Text></View>)
                })
              }
              <View style={{ marginTop: 8 }}>
                <View style={styles.stepDetail}>
                  <Text style={{ fontSize: 15 }}>Subtotal</Text>
                  <Text style={styles.stepDetailText}>${this.state.total}</Text>
                </View>
                <View style={styles.stepDetail}>
                  <Text style={{ fontSize: 15 }}>Taxes</Text>
                  <Text style={styles.stepDetailText}>${this.state.tax}</Text>
                </View>
              </View>
              <View style={styles.stepDetail}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Amount Paid</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: "auto" }}>${this.state.total}</Text>
              </View>
              <View style={styles.stepDetail}>
                <Text style={{ fontSize: 15 }}>Payment Method</Text>
                <Text style={styles.stepDetailText}>VISA</Text>
              </View>
              <View style={styles.stepDetail}>
                <Text style={{ color: colors.money, fontWeight: "bold" }}>Order/Reference ID: {orderID}</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Button onPress={() => this.navigation.navigate("Home")} block style={componentStyles.primaryButton}>
                    <Text style={{color: "white", fontWeight: "bold"}}>DONE</Text>
                </Button>
              </View>
            </ScrollView>
      </MenuDrawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16
  },
  bold: {
    fontWeight: "bold"
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold"
  },
  text: {
    fontSize: 16
  },
  textSmall: {
    fontSize: 15,
    fontWeight: "bold"
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  subHeading: {
    flexBasis: "auto",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#CCC",
    paddingTop: 8,
    paddingBottom: 8,
  },
  subHeading2: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#CCC",
    paddingTop: 8,
    paddingBottom: 8,
  },
  steps: {
    marginTop: 20
  },
  step: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8
  },
  stepDetail: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 3,
    paddingBottom: 3
  },
  stepDetailText: {
    marginLeft: "auto",
  }
});