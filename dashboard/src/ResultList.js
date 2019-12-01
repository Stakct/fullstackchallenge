import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

import moment from 'moment'

export default class ResultList extends Component {

  getTimestampByStatus(result) {
    switch(result.Status) {
      case 'Queued':
        return moment.utc(result.QueuedAt).format('DD-MM-YYYY HH:mm:ss')
      case 'In Progress':
        return moment.utc(result.ScanningAt).format('DD-MM-YYYY HH:mm:ss')
      case 'Success':
      case 'Failure':
        return moment.utc(result.FinishedAt).format('DD-MM-YYYY HH:mm:ss')
      default:
        return 'Invalid Scan Result'
    }
  }
  render(){
    const { results } = this.props;
    return (
      <List>
        {results.map((result, index) => {
          console.log("result", result)
          return (
            <List.Item key={index}>
              <List.Icon name='marker' />
              <List.Content>
                <List.Header as='a'>{result.RepositoryName}</List.Header>
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