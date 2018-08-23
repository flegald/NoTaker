import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../services/api';
import NoteOptions from './NoteOptions'

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

		this.renderHTML = this.renderHTML.bind(this);
	}

	renderHTML() {
		var html = {__html: this.state.contents}
		console.log(html);
		return html
	}

	render() {
		return (
			<div className="note-individual">
				<ul className="note-contents">
					<li><span className="note-title">{this.state.title}</span></li>
					<li dangerouslySetInnerHTML={this.renderHTML()}></li>
				</ul>
				< NoteOptions pk={this.state.pk} updateSelectedNote={this.props.updateSelectedNote} />
			</div>
		)

	}
}
