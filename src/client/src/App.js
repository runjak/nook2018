import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './gqlClient';
import PostList from './PostList';
import InputBox from './InputBox';

function App() {
  return (
    <ApolloProvider client={client}>
      <PostList />
      <InputBox />
    </ApolloProvider>
  );
}

export default App;
