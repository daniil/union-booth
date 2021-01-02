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
    beingAnsweredBy: [User]!
    answeredBy: [User]!
    dateCreated: Int!
  }

  type Answer {
    id: ID!
    user: User!
    question: Question!
    answer: String!
    dateCreated: Int!
  }

  type Query {
    topics: [Topic]!
    topic(id: ID!): Topic
    live: Topic
    questions: [Question]!
    question(id: ID!): Question
    answers: [Answer]!
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): User
    register(email: String!, password: String!): User
    addTopic(title: String!): Topic
    toggleTopicActive(id: ID!): Topic
    addQuestion(userId: ID!, isAnonymous: Boolean!, question: String): Question
    addQuestionAnswering(questionId: ID!, userId: ID!): Question
    addQuestionAnswered(questionId: ID!, userId: ID!): Question
    addAnswer(questionId: ID!, userId: ID!, answer: String!): Answer
  }
`;

module.exports = typeDefs;