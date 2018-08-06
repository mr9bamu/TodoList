import React, { Component } from 'react';
import { graphql} from 'react-apollo';
import { UPDATE_TASK } from '../mutations';

//Class for displaying a single list item
class ListItem extends Component {
    //constructor sets states using props and event handlers
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.task.id,
            name: this.props.task.name,
            editing: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    //This method sets the state of editing to true 
    //so that a text box is displayed for updating an individual task
    editTask() {
        this.setState({
            editing: true
        });
    }

    //This method is called when the user hits save after editing a task.
    saveTask() {
        //call th updateTask mutator method to make the change in the database
        this.props.updateTask({
            variables: {
                id: this.state.id,
                name: this.state.name
            },
            //set the state of the tasks name to the new name so it renders without a page reload
            update: (store, { data: { updateTask } }) => {
                this.setState({
                    name: this.state.name,
                    editing: false
                }); 
            }

        });

    }

    //Called when a user types in the input displayed when editing==true
    handleChange(e) {
        //Set the state of name to whatever the user is typeing so it is visible in the input
        this.setState({ name: e.target.value });
    }


    //Called when the page renders
    showTask() {
        //If a user is editing a list item 
        if (this.state.editing === true) {
            return (
                <span>
                    <input
                        value={this.state.name} size={4} onChange={this.handleChange} />
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

    //call show task
    render() {
        return (this.showTask());
    }
}

//export the update method and the entire class
export default graphql(UPDATE_TASK, { name: 'updateTask' })(ListItem);