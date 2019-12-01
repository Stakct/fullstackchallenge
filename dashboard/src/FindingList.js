import React, { Component } from 'react'
import { Table, Label, Header } from 'semantic-ui-react'

export default class FindingList extends Component {
    render(){
        const { findings } = this.props;

        if(findings.length === 0) {
            return (
                <Label>No findings for the selected Report.</Label>
            )
        }

        return (
            <div>
                <Header as='h1'>Findings from the selected Report</Header>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>RuleId</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Severity</Table.HeaderCell>
                            <Table.HeaderCell>Path</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {findings.map((finding, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        {finding.ruleId}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {finding.metadata.description}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {finding.metadata.severity}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {finding.location.path} on line {finding.location.line}
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                    <Table.Footer></Table.Footer>
                </Table>
            </div>
        )
    }
}