import React, { Component } from 'react';

import { Container } from 'semantic-ui-react';

import Dashboard from './Dashboard';
import NavBar from './Nav'
import AddResultModal from './AddResultModal'

import axios from 'axios';

import './App.css';

const API_URL = 'http://127.0.0.1:3000';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scanResults: [],
            modalOpen: false
        }
    }
  
    componentDidMount() {
        this.loadScanResults()
    }

    loadScanResults() {
        axios.get(`${API_URL}/results`).then(res => {
            const scanResults = res.data;
            this.setState({ scanResults });
        })  
    }

    addResult = (e) => {
        this.setState({ modalOpen: true })
    }

    closeModal = (e) => {
        this.setState({ modalOpen: false })
    }

    onConfirm = (e) => {
        this.loadScanResults()
        this.setState({ modalOpen: false })
    }

    render() {
        return (
            <Container fluid>
                <NavBar onAddResult={this.addResult}/>
                <Dashboard scanResults={this.state.scanResults}/>
                <AddResultModal modalOpen={this.state.modalOpen} onCancel={this.closeModal} onConfirm={this.onConfirm}/>
            </Container>
        )
    }
}