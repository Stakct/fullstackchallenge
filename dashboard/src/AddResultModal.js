import React, { Component } from 'react'
import {
    Button,
    Modal,
    Form,
    Label,
    Segment,
    Table,
    Header,
    Message
} from 'semantic-ui-react'

import axios from 'axios';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const API_URL = 'http://127.0.0.1:3000';

export default class AddResultModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: {
                RepositoryName: '',
                Status: '',
                QueuedAt: null,
                ScanningAt: null,
                FinishedAt: null,
                Findings: []
            },
            finding: {
                type: '',
                ruleId: '',
                path: '',
                line: '',
                description: '',
                severity: ''
            },
            errorMessage: null
        }
        
        this.handleReportChange = this.handleReportChange.bind(this)
        this.handleFindingChange = this.handleFindingChange.bind(this)
        this.handleDPQueuedChange = this.handleDPQueuedChange.bind(this)
        this.handleDPScanningChange = this.handleDPScanningChange.bind(this)
        this.handleDPFinishedChange = this.handleDPFinishedChange.bind(this)
        this.addFinding = this.addFinding.bind(this)
    }

    confirmClick = (event, data) => {
        if(['Queued', 'In Progress', 'Success', 'Failure'].indexOf(this.state.report.Status) === -1) {
            this.setState({
                errorMessage: 'Please select the Status.'
            })
            return
        }
        if(this.state.report.Status === 'Queued' && (this.state.report.QueuedAt === null || this.state.report.QueuedAt === '')) {
            this.setState({
                errorMessage: 'Please add the Queued At date and time.'
            })
            return
        }
        if(this.state.report.Status === 'In Progress' && (this.state.report.ScanningAt === null || this.state.report.ScanningAt === '')) {
            this.setState({
                errorMessage: 'Please add the Scanning At date and time.'
            })
            return
        }
        if((this.state.report.Status === 'Success' || this.state.report.Status === 'Failure') && (this.state.report.FinishedAt === null || this.state.report.FinishedAt === '')) {
            this.setState({
                errorMessage: 'Please add the Finished At date and time.'
            })
            return
        }
        axios.post(`${API_URL}/results`, this.state.report).then((response) => {
            this.setState({
                report: {
                    RepositoryName: '',
                    Status: '',
                    QueuedAt: null,
                    ScanningAt: null,
                    FinishedAt: null,
                    Findings: []
                }
            })
            this.props.onConfirm()
        }, (error) => {
            console.log(error);
        })
    }

    handleDPQueuedChange(date) {
        this.handleReportChange(null, { name:'QueuedAt', value:date })
    }

    handleDPScanningChange(date) {
        this.handleReportChange(null, { name:'ScanningAt', value:date })
    }

    handleDPFinishedChange(date) {
        this.handleReportChange(null, { name:'FinishedAt', value:date })
    }

    handleReportChange(e, { name, value }) {
        this.handleChange(e, { name, value }, 'report')
    }

    handleFindingChange(e, { name, value }) {
        this.handleChange(e, { name, value }, 'finding')
    }

    handleChange(e, { name, value }, context) {
        const { report, finding } = { ...this.state };

        if(context === 'report') {
            const currentState = report;
            currentState[name] = value;
            this.setState({
                report: currentState
            })
        }
        if(context === 'finding') {
            const currentState = finding;
            currentState[name] = value;
            this.setState({
                finding: currentState
            })
        }    
    }

    addFinding() {
        const { report } = { ...this.state };

        const currentState = report;
        currentState.Findings.push({
            type: this.state.finding.type,
            ruleId: this.state.finding.ruleId,
            location: {
                path: this.state.finding.ruleId,
                positions: {
                    begin: {
                        line: this.state.finding.line
                    }
                }
            },
            metadata: {
                description: this.state.finding.description,
                severity: this.state.finding.severity
            }
        })
        this.setState({
            report: currentState
        })
        this.setState({
            finding: {
                type: '',
                ruleId: '',
                path: '',
                line: '',
                description: '',
                severity: ''
            }
        })
    }

    removeFinding(index) {
        const { report } = { ...this.state };

        const currentState = report;
        currentState.Findings.splice(index, 1)
        this.setState({
            report: currentState
        })
    }
    
    render() {
        return (
        <Modal open={this.props.modalOpen}>
            <Modal.Header>Add a Scan Report</Modal.Header>
            <Modal.Content>
                <Segment>
                    <Form size="large">
                        <Form.Input
                            fluid
                            label="Repository Name"
                            name="RepositoryName"
                            placeholder="Repository Name"
                            value={this.state.report.RepositoryName}
                            onChange={this.handleReportChange}
                        />
                        <Form.Select
                            fluid
                            label="Status"
                            name="Status"
                            value={this.state.report.Status}
                            onChange={this.handleReportChange}
                            options={[
                                { text: 'Queued', value: 'Queued' },
                                { text: 'In Progress', value: 'In Progress' },
                                { text: 'Success', value: 'Success' },
                                { text: 'Failure', value: 'Failure' }
                              ]}
                        />
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Label>Queued At</Label>
                                <DatePicker
                                    name="QueuedAt"
                                    selected={this.state.report.QueuedAt}
                                    onChange={this.handleDPQueuedChange}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={1}
                                    timeCaption="time"
                                    dateFormat="dd-MM-yyyy h:mm aa"
                                />
                            </Form.Field>
                            <Form.Field>
                                <Label>Scanning At</Label>
                                <DatePicker
                                    name="ScanningAt"
                                    selected={this.state.report.ScanningAt}
                                    onChange={this.handleDPScanningChange}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={1}
                                    timeCaption="time"
                                    dateFormat="dd-MM-yyyy h:mm aa"
                                />
                            </Form.Field>
                            <Form.Field>
                                <Label>Finished At</Label>
                                <DatePicker
                                    name="FinishedAt"
                                    selected={this.state.report.FinishedAt}
                                    onChange={this.handleDPFinishedChange}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={1}
                                    timeCaption="time"
                                    dateFormat="dd-MM-yyyy h:mm aa"
                                />
                            </Form.Field>
                        </Form.Group>
                        <Header as='h1'>Findings from the selected Report</Header>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Type</Table.HeaderCell>
                                    <Table.HeaderCell>RuleId</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Severity</Table.HeaderCell>
                                    <Table.HeaderCell>Path</Table.HeaderCell>
                                    <Table.HeaderCell>Line</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Form.Input
                                            fluid
                                            name="type"
                                            value={this.state.finding.type}
                                            onChange={this.handleFindingChange}
                                            placeholder="Type"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Form.Input
                                            fluid
                                            name="ruleId"
                                            value={this.state.finding.ruleId}
                                            onChange={this.handleFindingChange}
                                            placeholder="RuleId"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Form.Input
                                            fluid
                                            name="description"
                                            value={this.state.finding.description}
                                            onChange={this.handleFindingChange}
                                            placeholder="Description"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Form.Select
                                            fluid
                                            name="severity"
                                            selected={this.state.finding.severity}
                                            onChange={this.handleFindingChange}
                                            options={[
                                                { text: 'Please select the severity', value: '' },
                                                { text: 'HIGH', value: 'HIGH' },
                                                { text: 'MEDIUM', value: 'MEDIUM' },
                                                { text: 'LOW', value: 'LOW' }
                                            ]}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Form.Input
                                            fluid
                                            name="path"
                                            value={this.state.finding.path}
                                            onChange={this.handleFindingChange}
                                            placeholder="Path"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Form.Input
                                            fluid
                                            name="line"
                                            value={this.state.finding.line}
                                            onChange={this.handleFindingChange}
                                            placeholder="Line"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            type='button'
                                            icon='add'
                                            labelPosition='right'
                                            onClick={this.addFinding}
                                            content='Add'
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                {this.state.report.Findings.map((finding, index) => {
                                    return (
                                        <Table.Row>
                                            <Table.Cell>
                                                {finding.type}
                                            </Table.Cell>
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
                                                {finding.location.path}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {finding.location.positions.begin.line}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button
                                                    type='button'
                                                    icon='trash'
                                                    labelPosition='right'
                                                    onClick={() => {this.removeFinding(index)}}
                                                    content='Remove'
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                            <Table.Footer></Table.Footer>
                        </Table>
                    </Form>
                </Segment>
                {(this.state.errorMessage !== null)?(
                    <Message negative>
                        <Message.Header>Pay attention</Message.Header>
                        <p>{this.state.errorMessage}</p>
                    </Message>
                ):null}
            </Modal.Content>
            <Modal.Actions>
                <Button
                    negative
                    type='button'
                    icon='remove'
                    labelPosition='right'
                    onClick={this.props.onCancel}
                    content='Cancel'
                />
                <Button 
                    positive
                    type='button'
                    icon='checkmark'
                    labelPosition='right'
                    onClick={this.confirmClick}
                    content='Confirm'
                />
            </Modal.Actions>
        </Modal>
        )
    }
}