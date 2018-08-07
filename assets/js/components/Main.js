import React, { Component } from 'react';
import { API } from '../services/api';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Container, Row, Col } from 'reactstrap';

import Nav from './Nav';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewSelected: null,
      user: null,
      notes: []
    }
  }



  render() {
    return (
      <div>

        <div>
          <Container>

            <Row>

              <Col xs="3" className="side-nav">
                < Nav />
              </Col>

              <Col xs="9" className="main-viewer">
                <p>CAVNAS</p>
              </Col>

            </Row>

          </Container>
        </div>

      </div>
    )
  }
}