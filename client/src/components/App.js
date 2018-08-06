import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import './App.css';

import { GET_TASKS } from '../queries';

import TaskList  from "./TaskList";



//create app
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
             name: '',
            };
    }


    render() {
        const loading = this.props.getTasks.loading;
        if (loading){
            return <div> loading </div>;
        }
        return (
            <div className="App">
                <h1>Todo...</h1>
                
                    <TaskList items={this.props.getTasks.tasks}/>
                </div>
        );
    }
}

export default compose(graphql(GET_TASKS, { name: 'getTasks' }))
    (App);

    
