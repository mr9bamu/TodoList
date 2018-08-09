import React from 'react';
import { graphql, compose } from 'react-apollo';

//import mutations & queries
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
    //change state.name variable. Called when the user types in the input
    handleChange(e) {
        this.setState({ name: e.target.value });
    }

    //Called when the user submits the form
    handleSubmit(e) {
        e.preventDefault();
        //If a user attempts to submit nothing just return 
        if (!this.state.name.length) {
            return;
        }
        //use mutator method to update the database
        this.props.addNewTask({
            variables: {
                name: this.state.name,
            },
            //set the state to rerender the TaskList with the new task included
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

    //Called when the user hits the delete button
    deleteTask(item) {
        //use mutator method to update the database
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
        //call mutator method to update database
        this.props.completeTask({
            variables: {
                id: item.id,
                //set isdone the NOT isDone
                isDone: !item.isDone,
            },
            update: (store, { data: { completeTask } }) => {
                //get the array of items
                const data = this.state.items.slice();
                //get index of completed task
                const index = data.findIndex(item => item.id === completeTask.id);
                //Update the isDone of completed task on the front end
                data[index] = completeTask;
                //set state so the isDone field corresponds with database without reloading page
                this.setState({
                    items: data
                })
            }
        }).then(function getResponse(response) {
            console.log(response);
        })
    }

    //Render the list of Tasks
    render() {

        return (

            //Input bar at the top of the page uses event handlers to addTask
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
                        //Map the List of individual items 
                        //Use the ListItem class to display the item name and its edit functionality
                        //Add a checkbox and delete button to use delete and check mutator methods
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

//Export all querys and mutations used in this class aswell as the class itself
export default compose(graphql(GET_TASKS, { name: 'getTasks' }),
    graphql(DELETE_TASK, { name: 'removeTask' }),
    graphql(COMPLETE_TASK, { name: 'completeTask' }), 
    graphql(ADD_TASK, { name: 'addNewTask'}))
    (TaskList);