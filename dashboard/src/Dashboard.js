import React, { Component } from 'react';

import axios from 'axios';

import {
  Grid,
  Image
} from 'semantic-ui-react';

import ResultList from './ResultList'

const API_URL = 'http://127.0.0.1:3000';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            scanResults: []
        }
    }

    componentDidMount() {
        this.loadScanResults()
    }

    loadScanResults() {
        axios.get(`${API_URL}/results`).then(res => {
            console.log("res", res)
            const scanResults = res.data;
            this.setState({ scanResults });
        })  
    }

    render(){
        return (
            <Grid padded columns={2}>
                <Grid.Row >
                    <Grid.Column>
                        <ResultList results={this.state.scanResults}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
