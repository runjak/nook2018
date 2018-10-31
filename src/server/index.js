const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const mkStatus = (open) => ({
  open,
  messages: [],
  date: new Date().toISOString(),
});

let statuus = [
  mkStatus(false),
];

const schema = buildSchema(`
  type Status {
    open: Boolean
    messages: [String]!
    date: String!
  }

  type Query {
    statuus: [Status]!
  }

  type Mutation {
    leaveMessage(message: String!): [Status]!
    setOpen(open: Boolean!): [Status]!
  }
`);

const root = {
  statuus() {
    return statuus;
  },
  leaveMessage({ message }) {
    const [ status ] = statuus;
    status.messages.push(message);

    return statuus;
  },
  setOpen({ open }) {
    statuus = [mkStatus(open), ...statuus];

    return statuus;
  }
};

const app = express();

app.use('/', graphqlHttp({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(27374);