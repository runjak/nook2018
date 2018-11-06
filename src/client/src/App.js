import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './gqlClient';
import PostList from './PostList';
import InputBox from './InputBox';
import PostStream from './PostStream';

function App() {
  return (
    <ApolloProvider client={client}>
      <PostList />
      <InputBox />
      <PostStream />
    </ApolloProvider>
  );
}

export default App;
