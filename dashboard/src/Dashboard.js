import React, { Component } from 'react';

import {
  Grid,
  Label
} from 'semantic-ui-react';

import ResultList from './ResultList'
import FindingList from './FindingList'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.onSelectItem = this.onSelectItem.bind(this)

        this.state = {
            selectedItemFindings: null
        }
    }

    onSelectItem(selectedItemFindings) {
        this.setState({ selectedItemFindings });
    }

    render(){
        return (
            <Grid padded columns={2}>
                <Grid.Row >
                    <Grid.Column>
                        <ResultList results={this.props.scanResults} onSelectItem={this.onSelectItem}/>
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
