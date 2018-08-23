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
	  		font: this.props.font,
		}

		this.renderHTML = this.renderHTML.bind(this);
	}

	renderHTML() {
		var html = {__html: this.state.contents}
		return html
	}

	enableOptions(div) {
		console.log(div.target.class);
		div.target.class = 'note-options-visible'
	}

	disableOptions(div) {
		div.target.class = 'note-options-hidden'
	}

	render() {
		return (
			<div className="note-individual">
				<ul className="note-contents">
					<li><span className="note-title">{this.state.title}</span></li>
					<li dangerouslySetInnerHTML={this.renderHTML()}></li>
				</ul>
				<div
				onMouseEnter={this.enableOptions.bind(this)}
				onMouseLeave={this.disableOptions.bind(this)}
				>
					<button>
						<i className="fa fa-edit" 
							id={this.state.pk.toString()} 
							onClick={this.props.updateSelectedNote.bind(this)}>
								
						</i>
					</button>
				</div>
			</div>
		)

	}
}
