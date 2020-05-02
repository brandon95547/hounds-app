import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Left, Right, Icon, Drawer, Container } from 'native-base';
import styled from 'styled-components';
import { colors } from '../GlobalStyles';

export default class RaptorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      type: 'default',
      items: this.props.items
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  buildItems(TABLE, TR, TDHEAD, TD, TBODY, CHECKBOX, TD1, TD2, TD3) {
    return (
      this.state.items.map((item, index) => {
        let subItemCount = item.items.length;
      // const { id, name, age, email } = student //destructuring
      return (
        <React.Fragment key={index}>
          <TABLE>
            <TBODY>
              <TR>
                <TDHEAD colSpan={3}>
                  <Icon style={{color: "white", marginRight: 7, fontSize: 16}} type={item.iconGroup} name={item.icon} /> {item.category}
                </TDHEAD>
              </TR>
            {
            item.items.map((subItem, subIndex) => {
              let borderClass = (subIndex+1) % 2 == 0 ? { backgroundColor: '#EEEEEE' } : {};
              return (
                <TR key={subIndex} style={borderClass}>
                  <TD1>{subItem.title}</TD1>
                  <TD2>{subItem.price}</TD2>
                  <TD3><CHECKBOX type="checkbox" value={subItem.price} /></TD3>
                </TR>
              )
            })}
            </TBODY>
        </TABLE>
        </React.Fragment>
      )
    })
    ) // return
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('A name was submitted: ' + this.state.value)
  }

  render() {
    let TABLE = styled.table`
      width: 100%;
      text-align: ${this.props.align};
      font-family: ${this.props.class};
      border-collapse: collapse;
      margin-top: 24px;
    `;
    let TR = styled.tr`
      color: inherit;
    `;
    let TDHEAD = styled.td`
      padding: 8px 16px;
      vertical-align: bottom;
      background-color: ${colors.primary};
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      color: white;
    `;
    let TD = styled.td`
      padding: 8px 16px;
      vertical-align: bottom
    `;
    let TD1 = styled.td`
      width: 60%;
      padding: 12px 16px;
      vertical-align: bottom
    `;
    let TD2 = styled.td`
      width: 20%;
      padding: 12px 16px;
      vertical-align: bottom
    `;
    let TD3 = styled.td`
      width: 20%;
      padding: 12px 16px;
      vertical-align: bottom
    `;
    let TBODY = styled.tbody`
      border-right: 1px solid rgba(0,0,0,.3);
      border-left: 1px solid rgba(0,0,0,.3);
      border-bottom: 1px solid rgba(0,0,0,.3);
    `;
    let FORM = styled.form`
      ${this.props.styles}
    `;
    let CHECKBOX = styled.input`
      transform: scale(2.25);
    `;
    return (
      <FORM onSubmit={this.handleSubmit}>
        {this.buildItems(TABLE, TR, TDHEAD, TD, TBODY, CHECKBOX, TD1, TD2, TD3)}
        <input type="submit" value="Submit" />
      </FORM>
    )
  }
}