import React from 'react';
//import Checkbox from './Checkbox';
//import gql from 'graphql-tag';
//import { graphql } from 'react-apollo';
import { COMPLETE_TASK } from '../mutations';
import { DELETE_TASK } from '../mutations';
import { GET_TASKS } from '../queries';
import { graphql, compose } from 'react-apollo';
import ListItem from './ListItem';

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
        this.props.removeTask({
            variables: {
                id: item.id,
            },
        }).then(function getResponse(response) {
            console.log(response);
        });
        //set the state to the list with non deleted items
        this.setState(prevState => ({
            items: prevState.items.filter(task => task != item)
        }));
    }


    checkTask(item) {
        //call mutator method
        this.props.completeTask({
            variables: {
                id: item.id,
                isDone: !item.isDone,
            },
            update: (store, { data: { completeTask } }) => {
                //
                const data = this.state.items.slice();
                //get index 
                const index = data.findIndex(item => item.id === completeTask.id);
                //this is sketchy
                completeTask.isDone = !completeTask.isDone;
                data[index] = completeTask;
                console.log(data[index]);
                this.setState({
                    items: data
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
                            <input type="checkbox" checked={item.isDone} onChange={() => this.checkTask(item)}></input>
                            <ListItem task={item} />
                            <button onClick={() => this.deleteTask(item)}>
                                {'Delete'}
                            </button>
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