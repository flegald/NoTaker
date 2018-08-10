import React, { Component } from 'react';
import { API } from '../services/api';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Container, Row, Col } from 'reactstrap';

import Nav from './Nav';
import NoteModal from './NoteModal';
import NoteCanvas from './NoteCanvas';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewSelected: null,
      user: null,
      noteModalOpen: false
    }

    this.selectView = this.selectView.bind(this);
  }

  selectView(event) {
    this.setState({
      viewSelected: event.target.id
    }, function(){console.log(this.state)})
  }

  render() {
    var addNoteView = (this.state.viewSelected == "addNote");

    return (
      <div>
          {!addNoteView ?
            null
          :
          < NoteModal
            isOpen={true}
            toggle={this.toggleModal}
            pk="new"
            title='New Note'
            contents=" "
            color=" "
            reminder=" "
            font=" "
            selectView={this.selectView} />

          }
          <Container>

            <Row>

              <Col xs="3" className="side-nav">
                < Nav selectView={this.selectView}/>
              </Col>

              <Col xs="9" className="main-viewer">
                < NoteCanvas />
              </Col>

            </Row>

          </Container>
      </div>
    )
  }
}
