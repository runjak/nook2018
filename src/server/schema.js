const { gql } = require('apollo-server-express');
const { PubSub } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

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
module.exports.typeDefs = typeDefs;

const pubSub = new PubSub();
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
      pubSub.publish(POST_ADDED, { postAdded: post });

      return post;
    },
  },
};
module.exports.resolvers = resolvers;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports.schema = schema;