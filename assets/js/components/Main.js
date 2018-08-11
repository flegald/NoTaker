import React, { Component } from 'react';
import { API } from '../services/api';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Container, Row, Col } from 'reactstrap';

import Nav from './Nav';
import NoteModal from './NoteModal';
import Note from './Note';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewSelected: null,
      selectedNote: null,
      user: null,
      noteModalOpen: false,
      notes: [],
      returnedId: 0
    }

    this.selectView = this.selectView.bind(this);
    this.loadNotes = this.loadNotes.bind(this);
  }

  selectView(event) {
    this.setState({
      viewSelected: event.target.id
    }, function(){console.log(this.state)})
  }

  loadNotes() {
    var api = new(API);
    var token = localStorage.getItem('ntkr.tkn');
    api.getUserNotes(token)
      .then(data => {
        var notes = [];
        data.map( note => {
          notes.push(note);
        })
        this.setState({
          notes: notes
        }, function(){console.log(this.state)})
      })
      .catch(data => {
        console.log("Error");
        console.log(data);
      })  
  }

  componentDidMount() {
    this.loadNotes();
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
            selectView={this.selectView}
            loadNotes={this.loadNotes} />

          }
          <Container>

            <Row>

              <Col xs="3" className="side-nav">
                < Nav selectView={this.selectView}/>
              </Col>

              <Col xs="9" className="main-viewer">
                <div>
                <Container>
                  <Row>
                  {this.state.notes.map( (note, index) => {
                    var noteNormalized = note[index.toString()];
                    var pk = noteNormalized["properties"]["note"];
                    var divId = "note-" + pk;
                    return (
                    <Col sm={{ size: 'auto', offset: 1 }}>
                          <div className="editNote" id={divId}>
                            < Note
                              pk={noteNormalized["contents"]["pk"]}
                              title={noteNormalized["properties"]["title"]}
                              contents={noteNormalized["contents"]["contents"]}
                              color=" "
                              reminder=" "
                              font=" "
                               />
                          </div>
                    </Col>
                    )
                  })}
                  </Row>
                </Container>
                </div>
              </Col>

            </Row>

          </Container>
      </div>
    )
  }
}
