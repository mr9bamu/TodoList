import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation, compose } from 'react-apollo';
import { UPDATE_TASK } from '../mutations';

class ListItem extends Component
{
    //In the constructor we set up our state and bind our methods to the parent methods in Tasks.js so that
    //when they are called we can change and reflect the data changes in our UI
    constructor(props)
    {
        super(props);
        this.state = {
            item: this.props.task,
            id: this.props.task.id,
            editing: false
        };
    }

    //This method is called when a user hits the save button after editing a task,
    //it updates the items value in the database to reflect the changes
    saveButton()
    {
        this.props.updateTask({
            variables:{
                id: this.state.id,
                item: this.state.task
            },
            update: (store, {data:{updateTask}}) =>
            {
                this.setState({
                    editing: false,
                    item: this.props.task
                });
            }
        });
    }

    onChange = (event) =>
    {
        this.setState({item: event.target.value});
    }

    createTask()
    {
        console.log(this.state);
        if(this.state.editing === true)
        {
            return(
                <span>
                <input value={this.state.item.name} onChange={this.onChange}/>
                <button className="save" onClick={()=> this.saveButton()}> Save Item</button>
                </span>
            );
        }
        else
        {
            return(
                <span id={this.state.id}>
                {this.state.item.name}
                <button className="edit" onClick={()=> this.editButton()}> Edit Item</button>
                </span>
            );
        }
    }

    editButton()
    {
        this.setState({
            editing: true
        });
    }

    render()
    {
        return(this.createTask());
    }
}

export default graphql(UPDATE_TASK,{name: 'updateTask'})(ListItem);