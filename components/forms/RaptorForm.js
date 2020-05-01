import React, { Component } from 'react';
import { Left, Right, Icon, Drawer, Container } from 'native-base';

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

  buildItems() {
    return (
      <table>
      {this.state.items.map((item, index) => {
      // const { id, name, age, email } = student //destructuring
      return (
        <React.Fragment key={index}>
            <thead>
              <tr>
                <th colSpan={3}>
                <Icon style={{color: "white"}} type="MaterialIcons" name='arrow-back' /> {item.category}
                </th>
              </tr>
            </thead>
            <tbody>
            {item.items.map((subItem, subIndex) => {
              return (
                <tr key={subIndex}>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
              )
            })}
            </tbody>
        </React.Fragment>
      )
    })}
    </table>
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
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        {this.buildItems()}
        <input type="submit" value="Submit" />
      </form>
    )
  }
}