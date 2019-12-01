import React, { Component } from 'react';
import { Header, Menu, Icon } from 'semantic-ui-react';

export default class NavBar extends Component {
    render() {
        return (
            <Menu inverted>
                <Menu.Item header>
                    <Header as='h1' color='teal'>FullStackChallenge</Header>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item name="addResult" onClick={this.props.onAddResult}>
                        <Icon name='plus' size='large' /> Add Result
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}
