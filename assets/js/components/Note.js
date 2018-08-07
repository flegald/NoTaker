import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../services/api';

export default class Nav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: this.props.isOpen,
      title: this.props.title,
			content: this.props.content,
      color: this.props.color,
      reminder: this.props.reminder,
      font: this.props.font
		}

		this.closeModal = this.closeModal.bind(this);
	}

	closeModal(){
		this.setState({
			isOpen: false
		})
		// Super dumb way to set view mode of Main back to null
		var fuaxEvent = {'target': {'id': null}};
		this.props.selectView(fuaxEvent);
	}

    render() {
      return (
        <Modal isOpen={this.state.isOpen}>
					<Form>

	          <ModalHeader>
							<FormGroup>
								<Input type="text" placeholder={this.state.title} />
							</FormGroup>
						</ModalHeader>

	          <ModalBody>
							<FormGroup>
								<Input type="textArea" placeholder={this.state.content} />
							</FormGroup>
	          </ModalBody>

	          <ModalFooter>
	            <Button color="primary">Save</Button>
	            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
	          </ModalFooter>

					</Form>
        </Modal>
      )

    }
	}
