import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import MenuDrawer from 'react-native-side-drawer'
import { globals, componentStyles, colors } from '../GlobalStyles'
import SideBar from '../SideBar'
import Header from '../Header'
import { WebView } from 'react-native-webview';

export default class CheckoutPaypal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      status: "Pending",
      showModal: false
    }

  }

  drawerContent = () => {
    return (
      <TouchableOpacity style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    )
  }

  handleResponse = data => {
    if(data.title == 'success') {
      this.setState({ showModal: false, status: "Complete" });
    }
    else if(data.title === 'cancel') {
      this.setState({ showModal: false })
    }
    else {
      return;
    }
  }

  render() {
    return (
      <>
      <Modal visible={this.state.showModal} inRequestClose={() => this.setState({ showModal: false })}>
        <WebView source={{ uri: "http://192.168.0.5:3000" }} onNavigationStateChange={data => this.handleResponse(data)} injectedJavascript={"document.f1.submit()" } />
      </Modal>
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
            <TouchableOpacity style={{ width: 100, height: 35 }} onPress={() => this.setState({ showModal: true })}>
              <Text>Pay with PayPal</Text>
            </TouchableOpacity>
            <Text>Payment Status: {this.state.status}</Text>
          </View>
      </MenuDrawer>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40
  }
})