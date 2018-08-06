import React from 'react';
import { graphql, compose } from 'react-apollo';

//import mutations & queris
import { ADD_TASK } from '../mutations';
import { COMPLETE_TASK } from '../mutations';
import { DELETE_TASK } from '../mutations';
import { GET_TASKS } from '../queries';

import ListItem from './ListItem';

class TaskList extends React.Component {

    //Constuctor sets state and event handlers
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            editing: false,
            name: ''
        };
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
                this.setState({
                    name: '',
                    items: [...this.state.items,addTask]
                });
            },
        }).then(function handleChange(response) {
            console.log(response);
        });
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

    render() {

        return (

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
            </div>

        );
    }
}


export default compose(graphql(GET_TASKS, { name: 'getTasks' }),
    graphql(DELETE_TASK, { name: 'removeTask' }),
    graphql(COMPLETE_TASK, { name: 'completeTask' }), 
    graphql(ADD_TASK, { name: 'addNewTask'}))
    (TaskList);