const { gql } = require('apollo-server-express');
const { PubSub } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const {
  types: potatoeTypes,
  potatoesAndMolasses,
  resolvers: potatoesAndMolassesResolvers,
} = require('./potatoesAndMolasses');

const typeDefs = gql`
  type Subscription {
    postAdded: Post
  }

  type Query {
    posts: [Post!]!
    potatoesAndMolasses(count: Int!): [PotatoeOrMolasses!]!
  }

  type Mutation {
    addPost(author: String!, comment: String!): Post
  }

  """
  Posts are a combination of author and comment.
  """
  type Post {
    """author of a Post"""
    author: String!
    """comment of a Post"""
    comment: String!
  }

  ${potatoeTypes}
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
    potatoesAndMolasses: (root, args, context) => (potatoesAndMolasses(args.count)),
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
  ...potatoesAndMolassesResolvers,
};
module.exports.resolvers = resolvers;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports.schema = schema;