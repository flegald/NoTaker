import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../services/api';
const classNames = require('classnames');

export default class NoteOptions extends Component {
	constructor(props) {
		super(props);

		this.state = {
		}


	}

	deleteNote(event) {
		var api = new(API);
		var token = localStorage.getItem('ntkr.tkn');
		var id = event.target.id;
		var pk = id.replace('remove-', '');
		console.log(pk);
		api.deleteExistingNoteRequest(token, pk)
	    .then(data => {
			console.log(data["responseJSON"])
			this.props.loadNotes();
	    })
	    .catch(data => {
			console.log(data['responseJSON']);
	    })
	}

	render(){
		var removalId = `remove-${this.props.pk.toString()}`;

		return (
			<div className='note-options-main' >
				<i className="fa fa-edit fa-2x" id={this.props.pk.toString()} onClick={this.props.updateSelectedNote.bind(this)}></i>
				<i className="fa fa-trash fa-2x" id={removalId} onClick={this.deleteNote.bind(this)}></i>
			</div>
		)
	}
}