import React, { Component } from 'react'
import {
    Button,
    Modal,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from 'semantic-ui-react'

export default class AddResultModal extends Component {
    confirmClick = (event, data) => {
        console.log("Passed in Prop Value: ");
        this.props.onCancel();
    }

    render() {
        return (
        <Modal open={this.props.modalOpen}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content>
                <Header as="h2" textAlign="center">Login</Header>
                <Segment>
                    <Form size="large">
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Email address"
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />
                        <Button color="blue" fluid size="large">Login</Button>
                    </Form>
                </Segment>
                <Message>Not registered yet? <a href="#">Sign Up</a></Message>
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