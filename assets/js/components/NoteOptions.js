import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const classNames = require('classnames');

export default class NoteOptions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mouseOn: true
		}

		this.enableOptions = this.enableOptions.bind(this);
		this.disableOptions = this.disableOptions.bind(this);
	}

	enableOptions() {
		this.setState({
			mouseOn: true
		}, function(){console.log(this.state)})
	}

	disableOptions() {
		this.setState({
			mouseOn: false
		}, function(){console.log(this.state)})	
	}

	render(){

	    var classes = classNames({
	      'note-options-main': true,
	      'note-options-hidden': this.state.mouseOn == false,
	      'note-options-visible': this.state.mouseOn

	    });

		return (
			<div 
				className='note-options-main' 
				onMouseEnter={this.enableOptions} 
				onMouseLeave={this.disableOptions}
			>
				<button><i className="fa fa-edit" id={this.props.pk.toString()} onClick={this.props.updateSelectedNote.bind(this)}></i></button>
			</div>
		)
	}
}