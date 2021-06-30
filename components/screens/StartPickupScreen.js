import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import MenuDrawer from "react-native-side-drawer";
import { Button } from "native-base";
import Header from "../Header";
import SideBar from "../SideBar";
import RaptorForm from "../forms/RaptorForm";
import * as Font from "expo-font";
import {
  globals,
  componentStyles,
  colors,
  spacingStyles,
} from "../GlobalStyles";
import UserContext from "../../UserContext";

export default class StartScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assetsLoaded: false,
      openForBusiness: false,
      open: false,
      foodTableHead: ["Item", "Price", "Select"],
    };

    this.toggleOpen = this.toggleOpen.bind(this);
  }

  static contextType = UserContext;

  async componentDidMount() {
    const { isLoggedIn, setCartData, setCartTotal } = this.context;
    isLoggedIn();
    this.isOpenForBusiness();

    // clear cart data on page load
    setCartData([]);
    setCartTotal(0);
    setTimeout(() => {
      this.setState({ assetsLoaded: true });
    }, 2000);
  }

  isOpenForBusiness() {
    let _this = this;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        if (response.openForBusiness == 1) {
          _this.setState({ openForBusiness: true });
        }
      }
    };

    var theUrl = "http://bluechipadvertising.com/openForBusiness.php?site_id=1";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({}));
  }

  drawerContent = () => {
    return (
      <TouchableOpacity style={componentStyles.animatedBox}>
        <SideBar
          navigation={this.props.navigation}
          toggleOpen={this.toggleOpen}
        />
      </TouchableOpacity>
    );
  };

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { assetsLoaded, openForBusiness } = this.state;

    if (assetsLoaded && openForBusiness) {
      return (
        <MenuDrawer
          open={this.state.open}
          drawerContent={this.drawerContent()}
          drawerPercentage={65}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
          <Header
            navigation={this.props.navigation}
            leftButton="interior"
            toggleOpen={this.toggleOpen}
          />

          <ScrollView
            style={{ ...componentStyles.paddingBox, ...colors.bgWhite }}
          >
            <View style={styles.pageTitleWrap}>
              <Text style={styles.pageTitle}>DRIVE IN MENU</Text>
            </View>

            <RaptorForm tableHead={this.state.foodTableHead} />

            <View style={styles.buttonWrap}>
              <Button
                style={componentStyles.primaryButton}
                block
                onPress={() => this.props.navigation.navigate("Cart")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  CHECKOUT
                </Text>
              </Button>
            </View>
          </ScrollView>
        </MenuDrawer>
      );
    } else if (!openForBusiness) {
      return (
        <>
          <Header
            navigation={this.props.navigation}
            leftButton="interior"
            toggleOpen={this.toggleOpen}
          />
          <View>
            <Text style={{ fontSize: 24, marginTop: 10 }}>
              The store is not open at this time...
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <Header
            navigation={this.props.navigation}
            leftButton="interior"
            toggleOpen={this.toggleOpen}
          />
          <View>
            <Text style={{ fontSize: 24, marginTop: 10 }}>Loading...</Text>
          </View>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  buttonWrap: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 50,
  },
  pageTitleWrap: {
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  adjustGap: {
    marginTop: 0,
  },
});
