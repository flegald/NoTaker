import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../services/api';

export default class NoteModal extends Component {
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

		this.closeModal = this.closeModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.saveNewNote = this.saveNewNote.bind(this);
	}

	closeModal() {
		this.setState({
			isOpen: false
		})
		// Super dumb way to set view mode of Main back to null
		var fakeEvent = {'target': {'id': null}};
		this.props.selectView(fakeEvent);
		this.props.resetSelectedNote();
	}

	handleChange(event) {
	    // Update values as user types

	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}

  	handleSubmit() {
  		if (this.state.pk == "new") {
  			this.saveNewNote();
  		} else {
				this.updateExistingNote();
			}
			this.closeModal();
  	}

	saveNewNote() {
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
				"color": "red",
				"font": "New-Times-Roman"
			}
		};
		api.createNewNoteRequest(token, data)
    .then(data => {
      console.log(data["responseJSON"])
			this.props.loadNotes();
    })
    .catch(data => {
      console.log(data['responseJSON']);
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
					"color": "red",
					"font": "New-Times-Roman"
				}
			};
			api.updateExistingNoteRequest(token, data, this.state.pk.toString())
			.then(data => {
	      console.log(data)
				this.props.loadNotes();
	    })
	    .catch(data => {
	      console.log(data['responseJSON']);
	    })
		}

    render() {
      return (
		    <Modal isOpen={this.state.isOpen}>
					<Form>

		      	<ModalHeader>
							<FormGroup>
								<Input type="text" id="title" placeholder={this.state.title} onChange={this.handleChange}/>
							</FormGroup>
						</ModalHeader>

		        <ModalBody>
							<FormGroup>
								<Input type="textArea" id="contents" placeholder={this.state.contents} onChange={this.handleChange}/>
							</FormGroup>
		        </ModalBody>

		        <ModalFooter>
		          <Button color="primary" onClick={this.handleSubmit}>Save</Button>
		          <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
		        </ModalFooter>

					</Form>
		    </Modal>
      )

    }
	}
