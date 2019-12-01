import React, { Component } from 'react';

import { Container } from 'semantic-ui-react';

import Dashboard from './Dashboard';
import NavBar from './Nav'
import AddResultModal from './AddResultModal'

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    }
  }

  addResult = (e) => {
    this.setState({ modalOpen: true })
  }

  closeModal = (e) => {
    this.setState({ modalOpen: false })
  }

  render() {
    return (
      <Container fluid>
        <NavBar onAddResult={this.addResult}/>
        <Dashboard />
        <AddResultModal modalOpen={this.state.modalOpen} onCancel={this.closeModal}/>
      </Container>
    );
  }
}