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

  buildItems(Table, TR, TRHEAD, TH, TD) {
    return (
      <Table>
      {this.state.items.map((item, index) => {
      // const { id, name, age, email } = student //destructuring
      return (
        <React.Fragment key={index}>
            <thead>
              <TRHEAD>
                <TH colSpan={3}>
                  <Icon style={{color: "white", marginRight: 7, fontSize: 16}} type={item.iconGroup} name={item.icon} /> {item.category}
                </TH>
              </TRHEAD>
            </thead>
            <tbody>
            {item.items.map((subItem, subIndex) => {
              return (
                <TR key={subIndex}>
                  <TD>1</TD>
                  <TD>2</TD>
                  <TD>3</TD>
                </TR>
              )
            })}
            </tbody>
        </React.Fragment>
      )
    })}
    </Table>
    )
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('A name was submitted: ' + this.state.value)
  }

  render() {
    let Table = styled.table`
      width: 100%;
      text-align: ${this.props.align};
      font-family: ${this.props.class};
    `;
    let TR = styled.tr`
      color: inherit
    `;
    let TRHEAD = styled.tr`
      color: white
    `;
    let TH = styled.th`
      padding: 8px 16px;
      vertical-align: bottom;
      background-color: ${colors.primary};
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    `;
    let TD = styled.td`
      padding: 8px 16px;
      vertical-align: bottom
    `;
    let Form = styled.form`
      ${this.props.styles}
    `;
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.buildItems(Table, TR, TRHEAD, TH, TD)}
        <input type="submit" value="Submit" />
      </Form>
    )
  }
}