const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    role: String!
    dateCreated: Int!
  }

  type Topic {
    id: ID!
    user: User!
    title: String!
    isActive: Boolean!
    dateCreated: Int!
  }

  type Question {
    id: ID!
    user: User!
    topic: Topic!
    question: String!
    isAnonymous: Boolean!
    beingAnsweredBy: [User]
    answeredBy: [User]
    dateCreated: Int!
  }

  type Answer {
    id: ID!
    user: User!
    question: Question!
    answer: String!
    dateCreated: Int!
  }
`;

module.exports = typeDefs;