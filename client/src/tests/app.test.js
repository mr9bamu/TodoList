import React from 'react';
import {ApolloProvider} from 'react-apollo';
import ReactDOM from 'react-dom';
import App from '../components/App';
import renderer from 'react-test-renderer';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import fetch from 'node-fetch';
import {InMemoryCache} from 'apollo-cache-inmemory';

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