import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink }  from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';



const client = new ApolloClient({
  link: new HttpLink(
    {
      uri: "http://localhost:4000/graphql/"
    }),
    cache: new InMemoryCache()
});

//so you can manipulate db within react
ReactDOM.render(<ApolloProvider client={client}>

    <App />
    
</ApolloProvider>, document.getElementById('root'));