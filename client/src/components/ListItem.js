import React, { Component } from 'react';
import { graphql, Mutation, compose } from 'react-apollo';
import { UPDATE_TASK } from '../mutations';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.task.id,
            name: this.props.task.name,
            editing: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    editTask() {
        this.setState({
            editing: true
        });
    }

    saveTask() {
        this.props.updateTask({
            variables: {
                id: this.state.id,
                name: this.state.name
            },
            update: (store, { data: { updateTask } }) => {
                this.setState({
                    name: this.state.name,
                    editing: false
                });
            }

        });

    }

    handleChange(e) {
        this.setState({ name: e.target.value });
    }


    showTask() {
        if (this.state.editing === true) {
            return (
                <span>
                    <input
                        value={this.state.name} onChange={this.handleChange} />
                    <button className="save" onClick={() => this.saveTask()}>Save</button>
                </span>
            );
        }
        else {
            return (
                <span id={this.state.id}>
                    {this.state.name}
                    <button className="edit" onClick={() => this.editTask()}>Edit</button>
                </span>
            );
        }
    }

    render() {
        return (this.showTask());
    }
}

export default graphql(UPDATE_TASK, { name: 'updateTask' })(ListItem);