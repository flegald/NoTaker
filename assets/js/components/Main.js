import React, { Component } from 'react';
import { API } from '../services/api';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Container, Row, Col } from 'reactstrap';

import Nav from './Nav';
import NoteModal from './NoteModal';
import Note from './Note';
import TopBar from './TopBar';

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
    this.resetSelectedNote = this.resetSelectedNote.bind(this);
    this.updateSelectedNote = this.updateSelectedNote.bind(this);
    this.showUpdateModal = this.showUpdateModal.bind(this);

  }

  selectView(event) {
    this.setState({
      viewSelected: event.target.id
    })
  }

  updateSelectedNote(event) {
    this.setState({
      selectedNote: event.target.id
    })
  }

  resetSelectedNote(){
    this.setState({
      selectedNote: null
    })
  }

  showUpdateModal() {
    for (var index=0; index<this.state.notes.length; index++) {
      var noteNormalized = this.state.notes[index][index.toString()];
      if (noteNormalized.properties.note.toString() === this.state.selectedNote) {
        return (
          < NoteModal
            isOpen={true}
            toggle={this.toggleModal}
            pk={noteNormalized["properties"]["note"]}
            title={noteNormalized["properties"]["title"]}
            contents={noteNormalized["contents"]["contents"]}
            color="red"
            reminder=" "
            font=" "
            selectView={this.selectView}
            loadNotes={this.loadNotes}
            resetSelectedNote={this.resetSelectedNote}
            />
        )
      }
    }
  }

  loadNotes() {
    this.setState({
      notes:[]
    })
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
      }, function(){this.forceUpdate();console.log(this.state)})
    })
    .catch(data => {
      console.log("Error");
      console.log(data);
    })
  }

  dumpNotes() {
    return (
        <Row>
          {this.state.notes.map( (note, index) => {
            var noteNormalized = note[index.toString()];
            var pk = noteNormalized["properties"]["note"];
            var divId = "note-" + pk;
            return (
            <Col sm={{ size: 'auto', offset: 1 }}>
                  <div>
                    < Note
                      pk={noteNormalized["properties"]["note"]}
                      title={noteNormalized["properties"]["title"]}
                      contents={noteNormalized["contents"]["contents"]}
                      color=" "
                      reminder=" "
                      font=" "
                      updateSelectedNote={this.updateSelectedNote}
                      loadNotes={this.loadNotes}
                       />
                  </div>
            </Col>
            )
          })}
        </Row>
    )
  }

  componentDidMount() {
    this.loadNotes();
  }

  render() {
    var addNoteView = (this.state.viewSelected == "addNote");
    var updateNoteView = (this.state.selectedNote != null);

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
            loadNotes={this.loadNotes}
            resetSelectedNote={this.resetSelectedNote}
            />
          }

          {!updateNoteView ?
            null
          :
            this.showUpdateModal()
          }



          <Container className="main-viewer">

          < TopBar />


            <Row>

              <Col xs="2" className="side-nav">
                < Nav selectView={this.selectView}/>
              </Col>

              <Col>
                <div className="nav-container">
                  <Container>
                    {this.dumpNotes()}
                  </Container>
                </div>
              </Col>

            </Row>

          </Container>
      </div>
    )
  }
}
