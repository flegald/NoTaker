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
  }

  render() {
    return (
      <div>
      	<Form>

      		<FormGroup>
      			<Label for="username-login">
					Username
				</Label>

				<Input
					type="text"
					name="username-input"
					id="username-login"
					placeholder="Username"
				/>	
      		</FormGroup>

      		<FormGroup>
      			<Label for="password-login">
      				Password
      			</Label>

				<Input
					type="password"
					name="password-input"
					id="password-login"
					placeholder="Password"
				/>	
			</FormGroup>

      	</Form>
      </div>
    )
  }
}