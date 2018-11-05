const express = require('express');
const { execute, subscribe } = require('graphql');
const { ApolloServer } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { createServer } = require('http');

const { typeDefs, resolvers, schema } = require('./schema');

const HTTP_PORT = 8000;
const WS_PORT = 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: `ws://localhost:${WS_PORT}/subscriptions`,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: HTTP_PORT }, () => {
  console.log(`Server ready at 'http://localhost:${HTTP_PORT}${server.graphqlPath}'.`);
  console.log(`Subscriptions expected at ${server.subscriptionsPath}.`)
});

const ws = createServer(app);
ws.listen(WS_PORT, () => {
  new SubscriptionServer({
    execute,
    subscribe,
    schema,
  }, {
    server: ws,
    path: '/subscriptions'
  });
});

/*
  Opportunities to play:
  1.   Explore with a browser
  1.1. Send a query
  1.2. Send a mutation
  1.3. Query again!
  2.   Add a helloWorld query
  2.1. Add a parameter to the query
  3.   Add a query to fetch distinct authors
  4.   Add a mutation to remove a post or rename an author
  5.   Use your wild and untamed imagination ;)
*/
