import React, { Component } from 'react'
import { List, Label } from 'semantic-ui-react'

import moment from 'moment'

export default class ResultList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null
        }
    }

    getTimestampByStatus(result) {
        switch(result.Status) {
            case 'Queued':
                return moment(result.QueuedAt).format('DD-MM-YYYY HH:mm:ss')
            case 'In Progress':
                return moment(result.ScanningAt).format('DD-MM-YYYY HH:mm:ss')
            case 'Success':
            case 'Failure':
                return moment(result.FinishedAt).format('DD-MM-YYYY HH:mm:ss')
            default:
                return 'Invalid Scan Result'
        }
    }

    displayReport(index) {
        const { results } = this.props;
        this.setState({ selectedItem: results[index].Id })
        this.props.onSelectItem(results[index].Findings || [])
    }

    render(){
        const { results } = this.props;
        
        if(results.length === 0) {
            return (
                <Label>No scan result found, use the Add Result button to add some.</Label>
            )
        }
        return (
            <List>
                {results.map((result, index) => {
                    return (
                        <List.Item key={index}>
                            {(this.state.selectedItem === result.Id)?(<List.Icon name='circle' />):(<List.Icon name='circle outline' />)}
                            <List.Content>
                                <List.Header as='a' onClick={() => {this.displayReport(index)}}>
                                    {(result.Findings)?(<Label color='teal'>{result.Findings.length}</Label>):null} {result.RepositoryName}
                                </List.Header>
                                <List.Description>
                                    {result.Status} {this.getTimestampByStatus(result)}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    )
                })}
            </List>
        )
    }
}