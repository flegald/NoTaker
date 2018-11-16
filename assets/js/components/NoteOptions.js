import React, { Component } from "react";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API } from "../services/api";
import { CirclePicker } from "react-color";
const classNames = require("classnames");

export default class NoteOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false
    };

    this.togglePopover = this.togglePopover.bind(this);
  }

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.popoverOpen && this.state.popoverOpen) {
      var fakeColorObj = { hex: this.props.noteColor };
      var fakeEvent = {};
      this.props.updateColor(fakeColorObj, fakeEvent);
    }
  }

  render() {
    var removalId = `remove-${this.props.pk.toString()}`;
    var colorId = `color-edit-${this.props.pk.toString()}`;

    return (
      <div className="note-options-main">
        <i
          className="fa fa-paint-brush fa-2x"
          id={colorId}
          onClick={this.togglePopover}
        />
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={colorId}
          toggle={this.togglePopover}
        >
          <PopoverBody>
            <CirclePicker
              onChange={this.props.updateExistingNote}
              onSwatchHover={this.props.updateColor.bind(this)}
            />
          </PopoverBody>
        </Popover>
        <i
          className="fa fa-edit fa-2x"
          id={this.props.pk.toString()}
          onClick={this.props.updateSelectedNote.bind(this)}
        />
        <i
          className="fa fa-check fa-2x"
          id={removalId}
          onClick={this.props.completeNote.bind(this)}
        />
        <i
          className="fa fa-trash fa-2x"
          id={removalId}
          onClick={this.props.deleteNote.bind(this)}
        />
      </div>
    );
  }
}
