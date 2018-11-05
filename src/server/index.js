const express = require('express');
const { PubSub } = require('apollo-server');
const { ApolloServer, gql } = require('apollo-server-express');

const pubSub = new PubSub();

const typeDefs = gql`
  type Subscription {
    postAdded: Post
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    addPost(author: String!, comment: String!): Post
  }

  type Post {
    author: String!
    comment: String!
  }
`;

const POST_ADDED = 'POST_ADDED';

const posts = [];

const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: () => pubSub.asyncIterator([POST_ADDED]),
    }
  },
  Query: {
    posts: (root, args, context) => (posts),
  },
  Mutation: {
    addPost: (root, args, context) => {
      console.log('Mutation.addPost:', JSON.stringify(args));

      const { author, comment } = args;

      if (!author || !comment) {
        return null;
      }

      const post = { author, comment };

      posts.push(post);
      pubSub.publish(POST_ADDED, post);

      return post;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const port = 27374;

const app = express();
server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server ready at 'http://localhost:${port}/${server.graphqlPath}'.`);
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
*/
