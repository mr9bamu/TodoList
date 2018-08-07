import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
/** Test structure**/
//Setup initial State
//Dispatch Action
//Expect Data to Change

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});