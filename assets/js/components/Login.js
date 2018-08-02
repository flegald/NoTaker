import React, { Component } from 'react';
import { API } from '../services/api';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    // BINDINGS
    this.handleChange = this.handleChange.bind(this);
    this.sendLoginRequest = this.sendLoginRequest.bind(this);

  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  sendLoginRequest() {
    var api = new(API);
    var un = this.state.username;
    var pw = this.state.password;

    api.loginRequest(un, pw)
    .then(data => {
      if (data.hasOwnProperty('token')) {
        localStorage.setItem('ntkr.tkn', data['token'])
      }
    })
    .catch(data => {
      console.log(`Error: ${data}`);
    })
  }
  

  render() {
    return (
      <div>
      	<Form className='loginForm'>

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

          <Button
            outline  
            color='primary'
            onClick={this.sendLoginRequest}
          >
            Submit
          </Button> 
          
      </Form>

      </div>
    )
  }
}