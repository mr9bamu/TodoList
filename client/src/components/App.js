import React, { Component } from 'react';

import './App.css';
//import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import TaskList  from "./TaskList";
//import query
import { GET_TASKS } from '../queries';
//import mutation
import { ADD_TASK } from '../mutations';

//create app
class App extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    //change state.name variable
    handleChange(e) {
        this.setState({ name: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        //if the length of your name doesn't... don't. 
        if (!this.state.name.length) {
            return;
        }
        this.props.addNewTask({
            variables: {
                name: this.state.name,
            },
            update: (store, { data: { addTask } }) => { 
                //By this point in execution, the new task is already added. 
                //GetTasks from cache , not from database to load locally       
                const data = store.readQuery({ query: GET_TASKS });  
                //Add the new task we generated to the local dataset 
                data.tasks.push(addTask);
                //Write the new dataset as the cache ------ DOES NOT WORK IDK WHY 
                store.writeQuery({ query: GET_TASKS, data });
                this.setState({ name: '' });
            },
        }).then(function handleChange(response) {
            this.setState({ name: '' });
            console.log(response);
        });
    }

    render() {
        const loading = this.props.getTasks.loading;
        if (loading){
            return <div> loading </div>;
        }
        return (
            <div className="App">
                <h1>Todo...</h1>
                <div className='taskList'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='input'>
                            <input
                                className="addTask"
                                onChange={this.handleChange}
                                value={this.state.name}
                                placeholder={'Add a task'}
                            />
                        </div>
                    </form>
                    <TaskList items={this.props.getTasks.tasks}/>
                </div>
            </div>
        );
    }
}

export default compose(graphql(GET_TASKS, { name: 'getTasks' }), 
    graphql(ADD_TASK, { name: 'addNewTask'}))
    (App);

    
