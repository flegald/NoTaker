import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../services/api';

export default class Note extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pk: this.props.pk,
			isOpen: this.props.isOpen,
      		title: this.props.title,
			contents: this.props.contents,
      		color: this.props.color,
      		reminder: this.props.reminder,
      		font: this.props.font
		}
	}


	render() {
		return (
			<div className="note-individual">
				<ul>
					<li>{this.state.title}</li>
					<li>{this.state.contents}</li>
				</ul>
			</div>
		)

	}
}
