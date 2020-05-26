import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors } from '../GlobalStyles'
import UserContext from '../../UserContext'

const dimensions = Dimensions.get('window')
const imageHeight = Math.round(dimensions.width * 9 / 16)
const imageWidth = dimensions.width

export default class AdminFoodScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      open: false,
      foodItems: [],
      tableHead: ["Title", "Price", "Category", "Edit"]
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  static contextType = UserContext

  componentDidMount() {
    this.getFoodItems()
  }

  getFoodItems() {
    const { setAdminFoodItems } = this.context
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        setAdminFoodItems(response)
        
      }
    }

    var theUrl = "http://bluechipadvertising.com/getFoodItems.php"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ action: "get-items" }))
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

  editFoodItem(item) {
    const { setItemToEdit } = this.context
    setItemToEdit(item)
    this.props.navigation.navigate("EditFood")
  }

  render() {
    const { adminFoodItems } = this.context
    console.log(adminFoodItems)
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
          
          <ScrollView style={{...componentStyles.paddingBox, ...colors.bgWhite}}>
            
              <View style={styles.pageTitleWrap}>
                <Text style={styles.pageTitle}>FOOD MANAGEMENT</Text>
              </View>

              <Table style={{ marginTop: 20 }}>
                <Row data={this.state.tableHead} style={styles.tableHeading} textStyle={styles.rowTextStyle}/>
                {
                  adminFoodItems.map((rowData, rowIndex) => (
                    <TableWrapper key={rowIndex} style={styles.tableWrapper}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          cellIndex != 4 ? <Cell key={cellIndex} data={cellIndex == 3 ? <Icon onClick={() => this.editFoodItem(rowData)} style={{ fontSize: 24 }} type="MaterialCommunityIcons" name='pencil' /> : cellData} textStyle={styles.text}/> : <Text key={cellIndex}></Text>
                        ))
                      }
                    </TableWrapper>
                  ))
                }
              </Table>

            </ScrollView>

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
  pageTitleWrap: {
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  tableHeading: {
    backgroundColor: "#EEE",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 18
  }, 
  tableWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 18
  },
  rowTextStyle: {
    fontSize: 17
  },
})