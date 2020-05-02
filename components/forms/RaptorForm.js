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

  buildItems(Table, TR, TRHEAD, TH) {
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
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
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
      background-color: ${colors.primary};
      color: white
    `;
    let TH = styled.th`
      padding: 8px 16px;
      vertical-align: bottom
    `;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        {this.buildItems(Table, TR, TRHEAD, TH)}
        <input type="submit" value="Submit" />
      </form>
    )
  }
}