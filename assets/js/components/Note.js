import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
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
	  		noteColor: this.props.noteColor,
	  		noteColorPreview: this.props.noteColor,
	  		reminder: this.props.reminder,
	  		font: this.props.font
		}

		this.renderHTML = this.renderHTML.bind(this);
		this.updateColor = this.updateColor.bind(this);
		this.updateExistingNote = this.updateExistingNote.bind(this);
	}

	renderHTML() {
		var html = {__html: this.state.contents}
		return html
	}

	updateColor(color, event) {
		this.setState({
			noteColorPreview: color.hex
		})
	}

	updateExistingNote() {
		var api = new(API);
		var token = localStorage.getItem('ntkr.tkn');
		var data = {
			"contents": {
				"contents": this.state.contents,
				"checked": false
			},
			"properties": {
				"rank": 1,
				"title": this.state.title,
				"color": this.state.noteColorPreview,
				"font": "New-Times-Roman"
			}
		};
		api.updateExistingNoteRequest(token, data, this.state.pk.toString())
		.then(data => {
			this.props.loadNotes();
		})
		.catch(data => {
			console.log(data['responseJSON']);
		})
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

	render() {
		var noteColor = {backgroundColor: this.state.noteColorPreview};

		return (
			<div className="note-individual" style={noteColor}>
				<ul className="note-contents">
					<li>
						<Container>
						<Row>
							<Col xs="10">
								<span className="note-title">{this.state.title}</span>
							</Col>
						</Row>
						</Container>
					</li>
					<li>
						<div className="note-spacer"></div>
					</li>
					<li dangerouslySetInnerHTML={this.renderHTML()}></li>
				</ul>
				< NoteOptions 
				noteColor={this.state.noteColor} 
				pk={this.state.pk} 
				updateSelectedNote={this.props.updateSelectedNote}
				loadNotes={this.props.loadNotes} 
				updateColor={this.updateColor}
				updateExistingNote={this.updateExistingNote}
				deleteNote={this.deleteNote}
				/>
			</div>
		)

	}
}
