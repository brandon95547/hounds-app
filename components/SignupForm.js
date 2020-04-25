import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import FormErrors from "./FormErrors";

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      formErrorsStatus: {
        show: false,
        message: "this is a message",
        variant: "success"
      }
    };

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  // a new change event has to be written for every field OR use the method below
  /*   handleChange(event) {
    this.setState({ email: event.target.value });
  } */

  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  });
  showAlert(alertStatus) {
    this.setState({
      formErrorsStatus: {
        show: true
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log("Email submitted: " + this.state.email); console.log("Password
    // submitted: " + this.state.password);

    
    if (this.state.email != "" && this.state.password != "") {
      
      var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(this.responseText);
          let alertStatus = {
            variant: response.success ? "success" : "danger",
            message: response.message
          }
          this.showAlert(alertStatus);
        }
      };

      var theUrl = "http://bluechipadvertising.com/signup.php";
      xmlhttp.open("POST", theUrl);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(JSON.stringify({email: this.state.email, password: this.state.password}));

    }
  }

  render() {
    const TodoItem = this.props.TodoItem;

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className="ph-3 mt-3">
          <FormErrors
            message={this.state.formErrorsStatus.message}
            status={this.state.formErrorsStatus}/>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="sr-only">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="sr-only">Password</Form.Label>
            <Form.Control
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"/>
          </Form.Group>

          <Button
            className="w-medium mt-5"
            variant="primary"
            size="lg"
            type="submit"
            block>
            LOGIN
          </Button>
          <div className="text-center">
            <Button variant="link" className="mt-2">
              Forgot Password
            </Button>
            <div className="mt-3">
              <Text>or</Text>
            </div>
          </div>
          <Button variant="outline-primary" size="lg" className="mt-2 w-medium btn-block">
            CREATE NEW ACCOUNT
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowColor: "#171717",
    shadowOpacity: 0.1
  },
  input: {
    backgroundColor: "#F3F3F3",
    flex: 1,
    fontSize: 18,
    height: 35
  },
  addButton: {
    width: 100,
    backgroundColor: "#FFCE00",
    alignItems: "center",
    justifyContent: "center"
  },
  addButtonText: {
    color: "#171717",
    fontSize: 18,
    fontWeight: "700"
  }
});
