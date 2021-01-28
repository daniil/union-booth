import gql from 'graphql-tag';

const typeDefs = gql`
  scalar Date

  type Program {
    id: ID!
    user: User!
    title: String!
    slug: String!
    createdAt: Date!
  }

  type Cohort {
    id: ID!
    user: User!
    program: Program!
    title: String!
    slug: String!
    createdAt: Date!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    role: String!
    cohortId: ID
    createdAt: Date!
  }

  type Topic {
    id: ID!
    user: User!
    program: Program!
    title: String!
    slug: String!
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
    programs: [Program]!
    selectedProgram: Program
    cohorts(programId: ID!): [Cohort]!
    selectedCohort: Cohort
    topics(programId: ID!): [Topic]!
    topic(slug: ID!): Topic!
    live: Topic!
    questions: [Question]!
    question(id: ID!): Question!
    answers: [Answer]!
    me: User!
  }

  type Mutation {
    login(login: String!, password: String!): User!
    logout: Boolean!
    register(
      firstName: String!
      lastName: String!
      username: String!
      email: String!,
      password: String!,
      isProgramOwner: Boolean!,
      cohortId: ID
    ): User
    addProgram(title: String!): Program!
    toggleProgramSelect(id: ID!, isSelected: Boolean!): Program
    addCohort(programId: ID!, title: String!): Cohort!
    toggleCohortSelect(id: ID!, isSelected: Boolean!): Cohort
    addTopic(programId: ID!, title: String!): Topic!
    toggleTopicActive(id: ID!): Topic!
    addQuestion(question: String, isAnonymous: Boolean!): Question!
    addQuestionAnswering(questionId: ID!): Question!
    addQuestionAnswered(questionId: ID!): Question!
    addAnswer(questionId: ID!, answer: String!): Answer!
  }

  type Subscription {
    testSub(id: ID): Topic
  }
`;

export default typeDefs;