import React, { Component } from 'react';

import axios from 'axios';

import {
  Grid,
  Label
} from 'semantic-ui-react';

import ResultList from './ResultList'
import FindingList from './FindingList'

const API_URL = 'http://127.0.0.1:3000';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.onSelectItem = this.onSelectItem.bind(this)

        this.state = {
            scanResults: [],
            selectedItemFindings: null
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

    onSelectItem(selectedItemFindings) {
        this.setState({ selectedItemFindings });
    }

    render(){
        return (
            <Grid padded columns={2}>
                <Grid.Row >
                    <Grid.Column>
                        <ResultList results={this.state.scanResults} onSelectItem={this.onSelectItem}/>
                    </Grid.Column>
                    <Grid.Column>
                        {(this.state.selectedItemFindings === null)?(
                            <Label>Please click on the Scan Result Title to see the findings.</Label>
                        ):(
                            <FindingList findings={this.state.selectedItemFindings}/>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
