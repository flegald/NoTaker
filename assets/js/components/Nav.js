import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faClock, faCheck } from '@fortawesome/free-solid-svg-icons'



import { API } from '../services/api';

export default class Nav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			viewSelected: null,
			options: [
				['Notes', 'notes', 'sticky-note'],
				['Reminders', 'remind', 'clock'],
				['Archived', 'archived', 'check']				
			]
		}
	}


	generateNav() {
		return (
	        <ul>
	        	{this.state.options.map( option => {
						return (
							<li>
								<FontAwesomeIcon icon={option[2]} /> 
								<p id={option[1]}>{option[0]}</p>
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



