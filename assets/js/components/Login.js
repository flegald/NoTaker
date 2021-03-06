import React, { Component } from "react";
import { API } from "../services/api";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert
} from "reactstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      incorrect: false,
      errorMsg: ""
    };

    // BINDINGS
    this.handleChange = this.handleChange.bind(this);
    this.sendLoginRequest = this.sendLoginRequest.bind(this);
    this.sendCreateUserRequest = this.sendCreateUserRequest.bind(this);
  }

  handleIncorrectLogin(value, msg) {
    this.setState({
      incorrect: value,
      errorMsg: msg
    });
  }

  handleChange(event) {
    // Update values as user types

    this.setState({
      [event.target.id]: event.target.value
    });
  }

  sendLoginRequest() {
    var api = new API();
    var un = this.state.username;
    var pw = this.state.password;
    this.handleIncorrectLogin(false);
    api
      .loginRequest(un, pw)
      .then(data => {
        if (data.hasOwnProperty("token")) {
          // Set token to local storage
          localStorage.setItem("ntkr.tkn", data["token"]);

          // Tell parent compopnent APP we are logged in
          this.props.logIn();
        }
      })
      .catch(data => {
        if (
          data["responseJSON"]["non_field_errors"][0] ==
          "Unable to log in with provided credentials."
        ) {
          this.handleIncorrectLogin(true, "Username or Password Incorrect");
        }
      });
  }

  sendCreateUserRequest() {
    var api = new API();
    var un = this.state.username;
    var pw = this.state.password;

    api
      .createUserRequest(un, pw)
      .then(data => {
        if (data.hasOwnProperty("token")) {
          // Set token to local storage
          localStorage.setItem("ntkr.tkn", data["token"]);

          // Tell parent compopnent APP we are logged in
          this.props.logIn();
        }
        else if (
           data["error"] ==
          "username_exists"
        ) {
          this.handleIncorrectLogin(true, "Username exists");
        }
      })
      .catch(data => {
        console.log("catch")
        console.log(data);
      });
  }

  render() {
    return (
      <div className="login">
        {this.state.incorrect ? (
          <Alert color="danger">{this.state.errorMsg}</Alert>
        ) : null}
        <form className="loginForm">
          <FormGroup>
            <Label for="username-login">Username</Label>

            <Input
              type="text"
              name="username-input"
              id="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password-login">Password</Label>

            <Input
              type="password"
              name="password-input"
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </FormGroup>

          <ul className="loginButts">
            <li>
              <Button outline color="primary" onClick={this.sendLoginRequest}>
                Login
              </Button>
            </li>
            <li>
              <Button
                outline
                color="success"
                onClick={this.sendCreateUserRequest}
              >
                Sign Up
              </Button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}
