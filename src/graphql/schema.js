const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    role: String!
    createdAt: Date!
  }

  type Topic {
    id: ID!
    user: User!
    title: String!
    isActive: Boolean!
    createdAt: Date!
  }

  type Question {
    id: ID!
    user: User!
    topic: Topic!
    question: String!
    isAnonymous: Boolean!
    beingAnsweredBy: [User]!
    answeredBy: [User]!
    createdAt: Date!
  }

  type Answer {
    id: ID!
    user: User!
    question: Question!
    answer: String!
    createdAt: Date!
  }

  type Query {
    topics: [Topic]!
    topic(id: ID!): Topic
    live: Topic!
    questions: [Question]!
    question(id: ID!): Question!
    answers: [Answer]!
    me: User
  }

  type Mutation {
    login(login: String!, password: String!): User!
    logout: Boolean!
    register(
      firstName: String!
      lastName: String!
      username: String!
      email: String!,
      password: String!
    ): User
    addTopic(title: String!): Topic
    toggleTopicActive(id: ID!): Topic
    addQuestion(question: String, isAnonymous: Boolean!): Question
    addQuestionAnswering(questionId: ID!): Question
    addQuestionAnswered(questionId: ID!): Question
    addAnswer(questionId: ID!, answer: String!): Answer
  }

  type Subscription {
    testSub(id: ID): Topic
  }
`;

module.exports = typeDefs;