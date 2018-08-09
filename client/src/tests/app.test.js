import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from '../components/App';
import TaskList from '../components/TaskList';

/** Test structure**/
//Setup initial State
//Dispatch Action
//Expect Data to Change

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql',
        fetch,
    }),
    cache: new InMemoryCache()
})

/*App*/

//A test to see if the app renders
describe('App', () => {
    it('should render without crashing', () => {
        const rendered = renderer.create(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        );
        expect(rendered).toBeTruthy();
    });
});

/*List Item*/

/*Task List*/
/*describe('TaskList', () => {
    it('rendered correctly', () => {
        const rendered = renderer.create(
            <ApolloProvider client={client}>
                <TaskList />
            </ApolloProvider>).toJSON();
        expect(rendered).toBeTruthy();
    });
});
test('Checkbox changes after click', () => {
  });
*/

