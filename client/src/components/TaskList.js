import React from 'react';
//import Checkbox from './Checkbox';
//import gql from 'graphql-tag';
//import { graphql } from 'react-apollo';
import { COMPLETE_TASK } from '../mutations';
import { DELETE_TASK } from '../mutations';
import { GET_TASKS } from '../queries';
import { graphql, compose } from 'react-apollo';

// Create a todo list react component to display list of tasks
class TaskList extends React.Component {

    constructor(props) {
        super(props);
        //this.state = { id: '' };
        this.state = {
            items: this.props.items,
            editing: false
        };
    }

    deleteTask(item) {
        const variables = {
            id: item.id,
        }
        console.log(item.id);
        console.log(this.props);
        this.props.removeTask({
            variables: {
                id: item.id,
            },
            update: (store, { data: { removeTask } }) => {
                const data = store.readQuery({
                    query: GET_TASKS
                })
                data.tasks = data.tasks.filter(task => task.id !== item.id)
                store.writeQuery({ query: GET_TASKS, data })
            }
        }).then(function getResponse(response) {
            console.log(response);
        });
    }

    checkTask(item) {
        this.props.completeTask({
            variables: {
                id: item.id,
                isDone: !item.isDone,
            },
            update: (store, { data: { completeTask } }) => {
                const data = this.state.tasks.slice();
                const index = data.findIndex(task => task.id === completeTask.id);
                data[index] = completeTask;
                this.setState({
                    tasks: data
                })
            }
        }).then(function getResponse(response) {
            console.log(response);
        })
    }
    editButton() {
    }


    completeTask(item) {
        console.log(item.id);
        // change item.name into a text box and then on submit update item.name
    }

    render() {

        return (

            <ul className="tasks">
                {

                    this.state.items.map(item => {
                        return <li key={item.id}>
                            <input type="checkbox" checked={item.isDone} onClick={() => this.checkTask(item)}></input>
                            {item.name}
                            <button onClick={() => this.deleteTask(item)}>
                                {'delete'}
                            </button>
                            <input
                                className="addTask"
                                onChange={this.handleChange}
                                value={this.state.name}
                                placeholder={'Change Task'}
                                size="4"
                            />
                        </li>

                    })

                }
            </ul>

        );
    }
}


export default compose(graphql(GET_TASKS, { name: 'getTasks' }),
    graphql(DELETE_TASK, { name: 'removeTask' }),
    graphql(COMPLETE_TASK, { name: 'completeTask' }))
    (TaskList);