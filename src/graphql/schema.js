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
    createdAt: Date!
  }

  type CohortTopic {
    cohortId: ID!
    topic: Topic!
    isUnlocked: Boolean!
    isLive: Boolean!
  }

  type CohortQuestion {
    id: ID!
    cohort: Cohort!
    topic: Topic!
    user: User!
    question: String!
    isAnonymous: Boolean!
    cohortAnswers: [CohortAnswer]!
    createdAt: Date!
    convertedToFAQ: Boolean!
  }

  type CohortAnswer {
    id: ID!
    cohortQuestion: CohortQuestion!
    user: User!
    answer: String!
    createdAt: Date!
  }

  type CohortAnswerInProgress {
    cohortQuestion: CohortQuestion!
    user: User!
    isActive: Boolean!
    createdAt: Date!
  }

  type TopicFAQ {
    topic: Topic!
    topicFAQQuestions: [TopicFAQQuestion]!
    cohortQuestions: [CohortQuestion]!
  }

  type TopicFAQQuestion {
    id: ID!
    question: String!
    answer: String!
    createdAt: Date!
    updatedAt: Date!
    topic: Topic!
    cohortQuestion: CohortQuestion
    isInactive: Boolean!
  }

  type Resource {
    id: ID!
    url: String!
    title: String!
    description: String!
    createdAt: Date!
    topic: Topic!
    isInactive: Boolean!
  }

  type Query {
    programs: [Program]!
    selectedProgram: Program
    cohorts(programId: ID!): [Cohort]!
    selectedCohort: Cohort
    topics(programId: ID!): [Topic]!
    cohortTopics(cohortId: ID!): [CohortTopic]!
    unlockedTopics: [CohortTopic]!
    topic(slug: ID!): CohortTopic!
    liveTopic: CohortTopic
    liveQuestions(cohortId: ID!, topicId: ID!): [CohortQuestion]!
    liveAnswers(cohortQuestionId: ID!): [CohortAnswer]!
    answersInProgress(cohortQuestionId: ID!): [CohortAnswerInProgress]!
    topicFAQ(slug: ID!): TopicFAQ!
  }

  type Mutation {
    login(login: String!, password: String!): User!
    logout: Boolean!
    register(
      firstName: String!,
      lastName: String!,
      username: String!,
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
    toggleCohortTopicUnlocked(cohortId: ID!, topicId: ID!, status: Boolean!): CohortTopic!
    toggleCohortTopicLive(cohortId: ID!, topicId: ID!, status: Boolean!): CohortTopic!
    addCohortQuestion(topicId: ID!, question: String!, isAnonymous: Boolean!): CohortQuestion!
    addCohortAnswer(cohortQuestionId: ID!, answer: String!): CohortAnswer!
    updateCohortAnswerProgress(cohortQuestionId: ID!, status: Boolean!): CohortAnswerInProgress!
    addTopicFAQQuestion(id: ID, topicId: ID!, cohortQuestionId: ID, question: String!, answer: String!): TopicFAQQuestion!
    deactivateTopicFAQQuestion(id: ID): TopicFAQQuestion!
  }

  type Subscription {
    newCohortQuestion(cohortId: ID!, topicId: ID!): CohortQuestion!
    newCohortAnswer(cohortQuestionId: ID!): CohortAnswer!
    cohortAnswerProgress(cohortQuestionId: ID!): CohortAnswerInProgress!
  }
`;

export default typeDefs;