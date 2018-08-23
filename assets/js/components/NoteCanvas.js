// import React, { Component } from 'react';
// import { Button, Form, FormGroup, Label, Input, FormText, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { API } from '../services/api';
// import Note from './Note';

// export default class NoteCanvas extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			notes: [],
// 			returnedId: 0
// 		}
// 	}

// 	loadNotes() {
// 		var api = new(API);
// 		var token = localStorage.getItem('ntkr.tkn');
// 		api.getUserNotes(token)
// 	    .then(data => {
// 	      var notes = [];
// 	      data.map( note => {
// 	      	notes.push(note);
// 	      })
// 	      this.setState({
// 	      	notes: notes
// 	      }, function(){console.log(this.state)})
// 	    })
// 	    .catch(data => {
// 	      console.log("Error");
// 	      console.log(data);
// 	    })	
// 	}


// 	componentDidMount() {
// 		this.loadNotes();
// 	}

// 	render() {
// 		return (
// 			<div>
// 			<Container>
// 				<Row>
// 				{this.state.notes.map( (note, index) => {
// 					var noteNormalized = note[index.toString()];
// 					return (
// 					<Col sm={{ size: 'auto', offset: 1 }}>
// 			          < Note
// 			            pk={noteNormalized["contents"]["pk"]}
// 			            title={noteNormalized["properties"]["title"]}
// 			            contents={noteNormalized["contents"]["contents"]}
// 			            color=" "
// 			            reminder=" "
// 			            font=" "
// 			             />
// 		             </Col>
// 					)
// 				})}
// 				</Row>
// 			</Container>
// 			</div>
// 		)
// 	}

// }