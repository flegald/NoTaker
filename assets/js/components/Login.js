import React, { Component } from 'react';
import { API } from '../services/api';
import { Button, Form, FormGroup, Label, Input, FormText, Alert  } from 'reactstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      incorrect: false
    }

    // BINDINGS
    this.handleChange = this.handleChange.bind(this);
    this.sendLoginRequest = this.sendLoginRequest.bind(this);
    this.sendCreateUserRequest = this.sendCreateUserRequest.bind(this);

  }

  handleIncorrectLogin(value) {
    this.setState({
      incorrect: value
    })
  }

  handleChange(event) {
    // Update values as user types

    this.setState({
      [event.target.id]: event.target.value
    });
  }

  sendLoginRequest() {
    var api = new(API);
    var un = this.state.username;
    var pw = this.state.password;
    this.handleIncorrectLogin(false);
    api.loginRequest(un, pw)
    .then(data => {
      console.log(data["responseJSON"])
      if (data.hasOwnProperty('token')) {

        // Set token to local storage
        localStorage.setItem('ntkr.tkn', data['token']);

        // Tell parent compopnent APP we are logged in
        this.props.logIn();
      }
    })
    .catch(data => {
      console.log(data['responseJSON']);
      if (data['responseJSON']['non_field_errors'][0] == 'Unable to log in with provided credentials.') {
        this.handleIncorrectLogin(true);
      }
    })
  }

  sendCreateUserRequest() {
    var api = new(API);
    var un = this.state.username;
    var pw = this.state.password;

    api.createUserRequest(un, pw)
    .then(data => {
      console.log(data["responseJSON"])
      if (data.hasOwnProperty('token')) {

        // Set token to local storage
        localStorage.setItem('ntkr.tkn', data['token']);

        // Tell parent compopnent APP we are logged in
        this.props.logIn();
      }
    })
    .catch(data => {
      console.log(data['responseJSON']);
    })
  }

  render() {
    return (
      <div>
        {this.state.incorrect ?
          <Alert color="danger">
            Username or Password Incorrect
          </Alert>
        :
          null
        }
      	<form className='loginForm'>

      		<FormGroup>

      			<Label for='username-login'>
					   Username
				    </Label>

    				<Input
    					type='text'
    					name='username-input'
    					id='username'
    					placeholder='Username'
              onChange={this.handleChange}
    				/>
      		</FormGroup>

      		<FormGroup>

      			<Label for='password-login'>
      				Password
      			</Label>

    				<Input
    					type='password'
    					name='password-input'
    					id='password'
    					placeholder='Password'
              onChange={this.handleChange}
    				/>

         </FormGroup>
         <div className='loginButts'>
            <Button
              outline
              color='primary'
              onClick={this.sendLoginRequest}
            >
              Login
            </Button>

        </div>
            <Button
              outline
              color='success'
              onClick={this.sendCreateUserRequest}
            >
              Sign Up
            </Button>
      </form>


      </div>
    )
  }
}
