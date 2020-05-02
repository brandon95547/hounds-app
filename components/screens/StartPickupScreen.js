import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, Form } from 'react-native';
import { Left, Right, Icon, Drawer, Container, Button } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import RaptorForm from '../forms/RaptorForm';
import { globals, componentStyles, colors, spacingStyles } from '../GlobalStyles';
import {FaPhone} from 'react-icons/fa';
import ReactDOM from "react-dom";
import {FaHotjar} from 'react-icons/fa';
import * as Font from 'expo-font';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

export default class StartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      assetsLoaded: false,
      todoInput: '',
      open: false,
      styles: {
        marginTop: 8
      },
      foodItems: [
        {
          category: "HOT FOODS",
          icon: "burn",
          iconGroup: "FontAwesome5",
          items: [
            {
              title:"Corn Dog",
              price: 2
            },
            {
              title:"Hot Dog",
              price: 2.5
            },
            {
              title:"BBQ Sandwich",
              price: 5
            },
          ]
        },
        {
          category: "SNACKS & CANDY",
          icon: "food-fork-drink",
          iconGroup: "MaterialCommunityIcons",
          items: [
            {
              title:"Corn Dog",
              price: 2
            },
            {
              title:"Hot Dog",
              price: 2.5
            },
            {
              title:"BBQ Sandwich",
              price: 5
            },
          ]
        },
        
      ]
    }

    this.toggleOpen = this.toggleOpen.bind(this);

  }

  isLoggedIn() {
    // let user = localStorage.getItem("user");
    // return user ? true : false
  }

  async componentDidMount() {
    await Font.loadAsync({
        'poppins-normal': require('../../assets/fonts/Poppins_400_normal.ttf')
    });
    this.setState({ assetsLoaded: true });
    // setState({ contentHeight: measureElement(this.content).height });
    // this.adjustGap();
    /* var node = ReactDOM.findDOMNode(this.refs["appHeader"]);
    this.setState({
      styles: {
        marginTop: node.offsetHeight
      }
    }); */
  }

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
        <SideBar />
      </TouchableOpacity>
    );
  };

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {

    // let continueButtonPage = this.isLoggedIn() ? "StartPickup" : "Login";
    let scrollViewStyles = {...componentStyles.paddingBox}

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
          
          <ScrollView style={scrollViewStyles}>
            <Text style={componentStyles.textNode}>
              <div>
                <strong>PICK UP ORDER</strong><br/>
                114 Raven Cir,
                <br/>
                Kings Mountain, NC 28086
              </div>
            </Text>

            <RaptorForm type="pricing-form" align="left" items={this.state.foodItems} />

            <View style={spacingStyles.mt3}>
              <form>
                  <div>
                   <FaHotjar/>
                    HOT FOODS
                  </div>
                  <table>
                    <thead>
                      <tr className="">
                        <th>Item</th>
                        <th>Price</th>
                        <th>Add</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Corn Dog</td>
                        <td>$2.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2" /></td>
                      </tr>
                      <tr>
                        <td>Hot Dog</td>
                        <td>$2.50</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2.5" /></td>
                      </tr>
                      <tr>
                        <td>BBQ Sandwich</td>
                        <td>$5.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="5" /></td>
                      </tr>
                      <tr>
                        <td>Chicken Tenders</td>
                        <td>$4.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="4" /></td>
                      </tr>
                      <tr>
                        <td>Chicken Wings</td>
                        <td>$6.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="6" /></td>
                      </tr>
                      <tr>
                        <td>Pizza</td>
                        <td>$2.00/slice</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2" /></td>
                      </tr>
                      <tr>
                        <td>Cheese Sticks</td>
                        <td>$4.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="4" /></td>
                      </tr>
                      <tr>
                        <td>Balogna Burger</td>
                        <td>$4.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="4" /></td>
                      </tr>
                      <tr>
                        <td>French Fries<br/>Add chili or cheese for .50 each.</td>
                        <td>$4.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="4" /></td>
                      </tr>
                      <tr>
                        <td>Fried Pickles<br/></td>
                        <td>$4.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="4" /></td>
                      </tr>
                      <tr>
                        <td>Hamburger/Cheeseburger<br/>Choice of lettuce, tomatoe, onions &amp; pickles.</td>
                        <td>$4.50</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="4.5" /></td>
                      </tr>
                      <tr>
                        <td>Onion Rings<br/></td>
                        <td>$3.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="3" /></td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                   <FaHotjar/>
                    SNACKS &amp; CANDY
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Slim Jim</td>
                        <td>$0.50</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value=".5" /></td>
                      </tr>
                      <tr>
                        <td>Special Character Combo Pack<br/>Popcorn, Drink, Sucker</td>
                        <td>$6.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="6" /></td>
                      </tr>
                      <tr>
                        <td>Blow Pop</td>
                        <td>$0.50</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value=".5" /></td>
                      </tr>
                      <tr>
                        <td>Pickled Egg or Sausage</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Cookies<br/>Chocolate Chip, Oatmeal Raisin, Peanut Butter</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Airheads</td>
                        <td>$0.50</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value=".5" /></td>
                      </tr>
                      <tr>
                        <td>All Candies</td>
                        <td>$2.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2" /></td>
                      </tr>
                      <tr>
                        <td>Cotton Candy</td>
                        <td>$3.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="3" /></td>
                      </tr>
                      <tr>
                        <td>Popcorn Large</td>
                        <td>$5.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="5" /></td>
                      </tr>
                      <tr>
                        <td>Nachos with cheese<br/>Add chili or jalapenos for .50/each.</td>
                        <td>$3.50</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="3.5" /></td>
                      </tr>
                      <tr>
                        <td>Pickle</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Donuts<br/>Cinnamon sugar/powdered</td>
                        <td>6 for $4.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="4" /></td>
                      </tr>
                      <tr>
                        <td>Funnel Cake Powdered/Cinnamon Sugar<br/>Add chocolate or strawberry $1.00 each</td>
                        <td>$4.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="4" /></td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                   <FaHotjar/>
                    Drinks
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td colSpan="3">Fountain Drinks:<br/>
                          Sundrop, Coke, Diet Coke, Sprite, Cherry Fanta, Dr. Pepper, Lemonade &amp; Tea</td>
                      </tr>
                      <tr>
                        <td>Small Drink</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Large Drink</td>
                        <td>$2.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2" /></td>
                      </tr>
                      <tr>
                        <td>Hot Chocolate</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Coffee</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Bottled Water</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Small Ice</td>
                        <td>$0.25</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value=".25" /></td>
                      </tr>
                      <tr>
                        <td>Large Ice</td>
                        <td>$0.50</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value=".5" /></td>
                      </tr>
                      <tr>
                        <td>44 oz Souvenir Dip<br/>Refills $4.00</td>
                        <td>$6.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="6" /></td>
                      </tr>
                      <tr>
                        <td>Small Slushie</td>
                        <td>$2.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2" /></td>
                      </tr>
                      <tr>
                        <td>Large Slushie</td>
                        <td>$4.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="4" /></td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                   <FaHotjar/>
                    ICE CREAM
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Orange Push-Ups</td>
                        <td>$2.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2" /></td>
                      </tr>
                      <tr>
                        <td>Ice Cream Sandwich</td>
                        <td>$2.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2" /></td>
                      </tr>
                      <tr>
                        <td>Drumsticks/Nutty Buddy</td>
                        <td>$2.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2" /></td>
                      </tr>
                      <tr>
                        <td>Soft Serve Ice Cream Cone<br />Vanilla, Chocolate or Swirl</td>
                        <td>$2.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2" /></td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                   <FaHotjar/>
                    MISCELLANEOUS
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Rent Radio<br />Valid driver's license required</td>
                        <td>$5.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="5" /></td>
                      </tr>
                      <tr>
                        <td>Buy Radio</td>
                        <td>$20.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="20" /></td>
                      </tr>
                      <tr>
                        <td>Tylenol</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Benadryl</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Advil</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Pepto Bismol</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>Glo Stick</td>
                        <td>$1.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="1" /></td>
                      </tr>
                      <tr>
                        <td>LED Bracelet</td>
                        <td>$4.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="4" /></td>
                      </tr>
                      <tr>
                        <td>Flashlight</td>
                        <td>$2.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="2" /></td>
                      </tr>
                      <tr>
                        <td>Bug Repellent</td>
                        <td>$5.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="5" /></td>
                      </tr>
                      <tr>
                        <td>Hound's Shirt</td>
                        <td>$15.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="15" /></td>
                      </tr>
                      <tr>
                        <td>Hound's Hat</td>
                        <td>$15.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="15" /></td>
                      </tr>
                      <tr>
                        <td>Blanket</td>
                        <td>$10.00</td>
                        <td><input type="checkbox" name="foodItems[]" onChange={this.updateCart} value="10" /></td>
                      </tr>
                    </tbody>
                  </table>
                  
                </form>
            </View>
              
          </ScrollView>

      </MenuDrawer>
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