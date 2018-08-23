import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../services/api';
import { CirclePicker } from 'react-color';
const classNames = require('classnames');

export default class NoteOptions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			popoverOpen: false
		}

		this.togglePopover = this.togglePopover.bind(this);

	}

	togglePopover() {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		})
	}

	render(){
		var removalId = `remove-${this.props.pk.toString()}`;

		return (
			<div className='note-options-main' >
				<i className="fa fa-paint-brush fa-2x" id="color-edit" onClick={this.togglePopover}></i>
		        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="color-edit" toggle={this.togglePopover}>
		          <PopoverBody>
		          	<CirclePicker
		          	onChange={this.props.updateExistingNote} 
		          	onSwatchHover={this.props.updateColor.bind(this)} 
		          	/>
		          </PopoverBody>
		        </Popover>
				<i className="fa fa-edit fa-2x" id={this.props.pk.toString()} onClick={this.props.updateSelectedNote.bind(this)}></i>
				<i className="fa fa-trash fa-2x" id={removalId} onClick={this.props.deleteNote.bind(this)}></i>
			</div>
		)
	}
}