import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './gqlClient';
import PostList from './PostList';

function App() {
  return (
    <ApolloProvider client={client}>
      <PostList />
    </ApolloProvider>
  );
}

export default App;
