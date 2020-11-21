import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';

import App from './App';

const httplLink = createHttpLink({
    uri: 'http://localhost:5000'
});

const authLink = setContext(()=>{
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}`: ''
        }
    }
})
const client = new ApolloClient({
    link: authLink.concat(httplLink),
    cache: new InMemoryCache()
});


export default (
    <ApolloProvider client = {client}>
        <App/>
    </ApolloProvider>
)