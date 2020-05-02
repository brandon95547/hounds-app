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
            {
              title:"Chicken Tenders",
              price: 4
            },
            {
              title:"Chicken Wings",
              price: 6
            },
            {
              title:"Pizza",
              price: 2,
              perSlice: true
            },
            {
              title:"Cheese Sticks",
              price: 4
            },
            {
              title:"Balagna Burger",
              price: 4
            },
            {
              title:"French Fries",
              description: "Add chili or cheese for .50 each",
              price: 4
            },
            {
              title:"Fried Pickles",
              price: 4
            },
            {
              title:"Hamburger/Cheeseburger",
              description: "Choice of lettuce, tomato, onions & pickles",
              price: 4.5
            },
            {
              title:"Onion Rings",
              price: 3
            },
          ]
        },
        {
          category: "SNACKS & CANDY",
          icon: "food-fork-drink",
          iconGroup: "MaterialCommunityIcons",
          items: [
            {
              title:"Slim Jim",
              price: .5
            },
            {
              title:"Special Character Combo Pack",
              description: "Popcorn, drink, sucker",
              price: 6
            },
            {
              title:"Blow Pop",
              price: .5
            },
            {
              title:"Pickled Egg or Sausage",
              price: 1
            },
            {
              title:"Cookies",
              description: "Chocolate chip, oatmeal raisin, peanut butter",
              price: 1
            },
            {
              title:"Airheads",
              price: .5
            },
            {
              title:"Cotton Candy",
              price: 3
            },
            {
              title:"Popcorn Large",
              price: 5
            },
            {
              title:"Nachos with Cheese",
              description: "Add chili or jalapenos for .50/each",
              price: 3.5
            },
            {
              title:"Pickle",
              price: 1
            },
            {
              title:"Donuts",
              description: "6 for $4.00, cinnamon sugar/powdered",
              price: 4
            },
            {
              title:"Funnel Cake Powdered/Cinnamon Sugar",
              description: "Add chocolate or stawberry $1.00 each",
              price: 4
            },
          ]
        },
        {
          category: "DRINKS",
          icon: "cup",
          iconGroup: "MaterialCommunityIcons",
          items: [
            {
              title:"Fountain Drinks",
              description: "Sundrop, Coke, Diet Coke, Sprite, Cherry Fanta, Dr. Pepper, Lemonade & Tea",
              price: .5
            },
            {
              title:"Small Drink",
              price: 1
            },
            {
              title:"Large Drink",
              price: 2
            },
            {
              title:"Hot Chocolate",
              price: 1
            },
            {
              title:"Coffee",
              price: 1
            },
            {
              title:"Bottled Water",
              price: 1
            },
            {
              title:"Small Ice",
              price: .25
            },
            {
              title:"Large Ice",
              price: .5
            },
            {
              title:"44 oz Souvenir Dip",
              price: 6,
              description: "Refills $4.00"
            },
            {
              title:"Small Slushie",
              price: 2
            },
            {
              title:"Large Slushie",
              price: 4
            },
          ]
        },
        {
          category: "ICE CREAM",
          icon: "ice-cream",
          iconGroup: "MaterialCommunityIcons",
          items: [
            {
              title:"Orange Push-ups",
              price: 2
            },
            {
              title:"Ice Cream Sandwich",
              price: 2
            },
            {
              title:"Drumsticks/Nutty Buddy",
              price: 2
            },
            {
              title:"Soft Serve Ice Cream Cone",
              price: 2,
              description: "Vanilla, chocolate or swirl"
            },
          ]
        },
        {
          category: "MISCELLANEOUS",
          icon: "puzzle-piece",
          iconGroup: "FontAwesome",
          items: [
            {
              title:"Rent Radio",
              description: "Valid drivers license required",
              price: 5
            },
            {
              title:"Buy Radio",
              price: 20
            },
            {
              title:"Tylenol",
              price: 1
            },
            {
              title:"Benadryl",
              price: 1
            },
            {
              title:"Advil",
              price: 1
            },
            {
              title:"Pepto Bismol",
              price: 1
            },
            {
              title:"Glo Stick",
              price: 1
            },
            {
              title:"LED Bracelet",
              price: 4
            },
            {
              title:"Flashlight",
              price: 2
            },
            {
              title:"Bug Repellent",
              price: 5
            },
            {
              title:"Hound's Shirt",
              price: 15
            },
            {
              title:"Hound's Hat",
              price: 15
            },
            {
              title:"Blanket",
              price: 10
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
    let scrollViewStyles = {...componentStyles.paddingBox, ...colors.bgWhite}

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

            <RaptorForm type="pricing-form" class="poppins-normal" align="left" items={this.state.foodItems} />

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