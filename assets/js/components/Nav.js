import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../services/api';

export default class Nav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			viewSelected: null,
			options: [
				['New Note', 'addNote', 'plus'],
				['Notes', 'notes', 'sticky-note'],
				['Reminders', 'reminders', 'clock'],
				['Archived', 'archived', 'check']
			]
		}
	}

	generateNav() {
		return (
	        <ul className="nav-list">
	        	{this.state.options.map( option => {
						return (
							<li className="nav-item">
								<p id={option[1]} onClick={this.props.selectView.bind(this)}> <FontAwesomeIcon icon={option[2]} /> {option[0]}</p>
							</li>
						)
					})
				}
	        </ul>
	    )
	}

	render() {
	    return (
	      <div>
	      	{this.generateNav()}
	      </div>
	    )
	  }
	}
