import React, { Component } from 'react';
import { API } from '../services/api';
import Login from './Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.checkToken = this.checkToken.bind(this);

    this.state = {
      loggedIn: false
    }
  }

  checkToken() {
    var api = new(API)
  	var loggedIn = false;
  	var token = localStorage.getItem('ntkr.tkn');

    api.getUserSelf(token)
    .then(data => {
      if (data.hasOwnProperty("username")) {
        this.setState({
          loggedIn: true
        })
      }
    })
    .catch(data => {
      console.log(`Error: ${data}`);
    })
  }

  logIn() {
    this.setState({
      loggedIn: true
    })
  }

  componentDidMount () {
      this.checkToken()
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? 
          <div>Hello</div>
          :
          < Login logIn={this.logIn} />
        }
      </div>
    )
  }
}