import React from 'react';
import {StyleSheet, Text, View, Platform, ScrollView} from 'react-native';
// custom components
import Header from '../Header';
import NavBar from '../NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import {FaHotjar} from 'react-icons/fa';
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";

export default class StartPickupScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      styles: {
        marginTop: 8
      },
      pizzaSlices: 0,
      navigation: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var node = ReactDOM.findDOMNode(this.refs["appHeader"]);
    this.setState({
      styles: {
        marginTop: node.offsetHeight
      },
      navigation: this.props.navigation
    });
  }

  handleSubmit(event) {
    let _this = this;
    event.preventDefault();
    // const data = new FormData(event.target);
    // console.log(event.target.querySelector('[name="foodItems[]"').value);

    let cartItems = [];
    let total = 0;
    var elems = document.querySelectorAll('[name="foodItems[]'),
    res = Array.from(elems).map(v => v);
    res.forEach((element) => {
      
      if(element.checked || (element.type == "text" && element.value != 0)) {
        let itemTitle = element.parentElement.previousSibling.previousSibling.innerHTML;
        total += parseFloat(element.value);
        cartItems.push(
          {
            title: itemTitle.replace("<br>", " "),
            val: parseFloat(element.value)
          }
        );
      }
    });
    localStorage.setItem("total", total);
    localStorage.setItem("cartItems", cartItems.length != 0 ? JSON.stringify(cartItems) : null);
    
    if(cartItems !== null) {
      _this.state.navigation.navigate("Cart")
    }
    else {
      alert("Please add something to your cart");
    }

  }

  updateCart() {
    
  }

  render() {
    return (
      <div className="app-main-container">
        <Header
          interior={true}
          navigation={this.props.navigation}
          title="Start Pickup Order"
          ref="appHeader"/>/>

        <Container style={this.state.styles}>
          <Row>
            <Col>
              <div>
                <strong>PICK UP ORDER</strong><br/>
                114 Raven Cir,
                <br/>
                Kings Mountain, NC 28086
              </div>
              <Form onSubmit={this.handleSubmit}>
                <div className="bg-primary c-white pv-sm ph-1 mt-3">
                  <FaHotjar className="mr-sm"/>
                  HOT FOODS
                </div>
                <Table striped bordered hover size="sm" className="mt-1 table-std">
                  <thead>
                    <tr className="">
                      <th>Item</th>
                      <th>Price</th>
                      <th className="w-15">Add</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Corn Dog</td>
                      <td>$2.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="2" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Hot Dog</td>
                      <td>$2.50</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="2.5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>BBQ Sandwich</td>
                      <td>$5.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Chicken Tenders</td>
                      <td>$4.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="4" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Chicken Wings</td>
                      <td>$6.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="6" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Pizza</td>
                      <td>$2.00/slice</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={(e) => {this.setState({pizzaSlices: e.target.value})}} value={this.state.pizzaSlices} type="text"/></td>
                    </tr>
                    <tr>
                      <td>Cheese Sticks</td>
                      <td>$4.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="4" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Balogna Burger</td>
                      <td>$4.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="4" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>French Fries<br/>Add chili or cheese for .50 each.</td>
                      <td>$4.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="4" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Fried Pickles<br/></td>
                      <td>$4.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="3" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Hamburger/Cheeseburger<br/>Choice of lettuce, tomatoe, onions &amp; pickles.</td>
                      <td>$4.50</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="4" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Onion Rings<br/></td>
                      <td>$3.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="3" type="checkbox"/></td>
                    </tr>
                  </tbody>
                </Table>
                <div className="bg-primary c-white pv-sm ph-1 mt-3">
                  <FaHotjar className="mr-sm"/>
                  SNACKS &amp; CANDY
                </div>
                <Table striped bordered hover size="sm" className="mt-1 table-std">
                  <tbody>
                    <tr>
                      <td>Slim Jim</td>
                      <td>$0.50</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value=".5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Special Character Combo Pack<br/>Popcorn, Drink, Sucker</td>
                      <td>$6.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="6" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Blow Pop</td>
                      <td>$0.50</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value=".5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Pickled Egg or Sausage</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Cookies<br/>Chocolate Chip, Oatmeal Raisin, Peanut Butter</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Airheads</td>
                      <td>$0.50</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value=".5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>All Candies</td>
                      <td>$2.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="2" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Cotton Candy</td>
                      <td>$3.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="3" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Popcorn Large</td>
                      <td>$5.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Nachos with cheese<br/>Add chili or jalapenos for .50/each.</td>
                      <td>$3.50</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="3.5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Pickle</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Donuts<br/>Cinnamon sugar/powdered</td>
                      <td>6 for $4.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="4" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Funnel Cake Powdered/Cinnamon Sugar<br/>Add chocolate or strawberry $1.00 each</td>
                      <td>$4.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="" type="checkbox"/></td>
                    </tr>
                  </tbody>
                </Table>
                <div className="bg-primary c-white pv-sm ph-1 mt-3">
                  <FaHotjar className="mr-sm"/>
                  Drinks
                </div>
                <Table striped bordered hover size="sm" className="mt-1 table-std">
                  <tbody>
                    <tr>
                      <td colSpan="3">Fountain Drinks:<br/>
                        Sundrop, Coke, Diet Coke, Sprite, Cherry Fanta, Dr. Pepper, Lemonade &amp; Tea</td>
                    </tr>
                    <tr>
                      <td>Small Drink</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Large Drink</td>
                      <td>$2.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="2" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Hot Chocolate</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Coffee</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Bottled Water</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Small Ice</td>
                      <td>$0.25</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value=".25" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Large Ice</td>
                      <td>$0.50</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value=".5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>44 oz Souvenir Dip<br/>Refills $4.00</td>
                      <td>$6.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Small Slushie</td>
                      <td>$2.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="2" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Large Slushie</td>
                      <td>$4.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="4" type="checkbox"/></td>
                    </tr>
                  </tbody>
                </Table>
                <div className="bg-primary c-white pv-sm ph-1 mt-3">
                  <FaHotjar className="mr-sm"/>
                  ICE CREAM
                </div>
                <Table striped bordered hover size="sm" className="mt-1 table-std">
                  <tbody>
                    <tr>
                      <td>Orange Push-Ups</td>
                      <td>$2.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="2" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Ice Cream Sandwich</td>
                      <td>$2.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="2" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Drumsticks/Nutty Buddy</td>
                      <td>$2.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="2" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Soft Serve Ice Cream Cone<br />Vanilla, Chocolate or Swirl</td>
                      <td>$2.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="2" type="checkbox"/></td>
                    </tr>
                  </tbody>
                </Table>
                <div className="bg-primary c-white pv-sm ph-1 mt-3">
                  <FaHotjar className="mr-sm"/>
                  MISCELLANEOUS
                </div>
                <Table striped bordered hover size="sm" className="mt-1 table-std">
                  <tbody>
                    <tr>
                      <td>Rent Radio<br />Valid driver's license required</td>
                      <td>$5.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Buy Radio</td>
                      <td>$20.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="20" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Tylenol</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Benadryl</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Advil</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Pepto Bismol</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Glo Stick</td>
                      <td>$1.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="1" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>LED Bracelet</td>
                      <td>$4.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="4" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Flashlight</td>
                      <td>$2.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="2" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Bug Repellent</td>
                      <td>$5.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="5" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Hound's Shirt</td>
                      <td>$15.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="15" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Hound's Hat</td>
                      <td>$15.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="15" type="checkbox"/></td>
                    </tr>
                    <tr>
                      <td>Blanket</td>
                      <td>$10.00</td>
                      <td className="w-15"><Form.Control  name="foodItems[]" onChange={this.updateCart} value="10" type="checkbox"/></td>
                    </tr>
                  </tbody>
                </Table>
                <Button type="submit" variant="secondary" size="lg" className="mt-2 mb-3 w-medium btn-block">
                  UPDATE CART
                </Button>
              </Form>
            </Col>
          </Row>
          </Container>
        </div>
    );
  }
}