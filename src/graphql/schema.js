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
    role: String!
    cohortId: ID
    cohort: Cohort!
    createdAt: Date!
    isVerified: Boolean!
    isInactive: Boolean!
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
    updatedAt: Date!
    convertedToFAQ: Boolean!
    isInactive: Boolean!
  }

  type CohortQuestionUpvote {
    cohortQuestion: CohortQuestion!
    user: User!
    isAdd: Boolean!
  }

  type CohortAnswer {
    id: ID!
    cohortQuestion: CohortQuestion!
    user: User!
    answer: String!
    createdAt: Date!
    updatedAt: Date!
    isInactive: Boolean!
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

  type TopicResources {
    topic: Topic!
    resources: [Resource]!
  }

  type Resource {
    id: ID!
    url: String!
    title: String!
    description: String!
    order: Int!
    createdAt: Date!
    topic: Topic!
    isInactive: Boolean!
  }

  input ResourceOrderInput {
    id: ID!
    order: Int!
  }

  type Query {
    user(id: ID!): User!
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
    topicResources(slug: ID!): TopicResources!
    unverifiedUsers(cohortId: ID!): [User]!
    cohortUsers(cohortId: ID!): [User]!
    cohortTeamUsers(cohortId: ID!): [User]!
    programUsers: [User]!
    appVersion: String!
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
      cohortId: ID,
      programId: ID
    ): User
    updateUserAvatar(userId: ID!): Boolean!
    updateUserInfo(userId: ID!, firstName: String, lastName: String, username: String, email: String): User!
    updateUserPassword(userId: ID!, password: String!): Boolean!
    verifyUser(id: ID!): User!
    updateUserActiveStatus(id: ID!, isInactive: Boolean!): User!
    updateUserRole(id: ID!, newRole: String!): User!
    deactivateUserAccount: User!
    addProgram(title: String!): Program!
    toggleProgramSelect(id: ID!, isSelected: Boolean!): Program
    addCohort(programId: ID!, title: String!): Cohort!
    toggleCohortSelect(id: ID!, isSelected: Boolean!): Cohort
    addTopic(programId: ID!, title: String!): Topic!
    toggleCohortTopicUnlocked(cohortId: ID!, topicId: ID!, status: Boolean!): CohortTopic!
    toggleCohortTopicLive(cohortId: ID!, topicId: ID!, status: Boolean!): CohortTopic!
    addCohortQuestion(questionId: ID, topicId: ID!, question: String!, isAnonymous: Boolean!): CohortQuestion!
    deactivateCohortQuestion(cohortQuestionId: ID!): CohortQuestion!
    toggleCohortQuestionUpvote(cohortQuestionId: ID!, isAdd: Boolean!): Boolean!
    addCohortAnswer(answerId: ID, cohortQuestionId: ID!, answer: String!): CohortAnswer!
    deactivateCohortAnswer(cohortAnswerId: ID!): CohortAnswer!
    updateCohortAnswerProgress(cohortQuestionId: ID!, status: Boolean!): CohortAnswerInProgress!
    addTopicFAQQuestion(id: ID, topicId: ID!, cohortQuestionId: ID, question: String!, answer: String!): TopicFAQQuestion!
    deactivateTopicFAQQuestion(id: ID!): TopicFAQQuestion!
    addResource(id: ID, topicId: ID!, url: String!, title: String!, description: String!): Resource!
    updateResourcesOrder(topicSlug: ID!, orderList: [ResourceOrderInput]!): TopicResources!
    deactivateResource(id: ID!): Resource!
  }

  type Subscription {
    userAvatarUpdated(userId: ID!): ID!
    newCohortQuestion(cohortId: ID!, topicId: ID!): CohortQuestion!
    cohortQuestionUpdated(cohortId: ID!, topicId: ID!): CohortQuestion!
    cohortQuestionDeactivated(cohortId: ID!, topicId: ID!): CohortQuestion!
    cohortQuestionUpvoteUpdated(cohortQuestionId: ID!): CohortQuestionUpvote!
    newCohortAnswer(cohortQuestionId: ID!): CohortAnswer!
    cohortAnswerUpdated(cohortQuestionId: ID!): CohortAnswer!
    cohortAnswerDeactivated(cohortQuestionId: ID!): CohortAnswer!
    cohortAnswerProgress(cohortQuestionId: ID!): CohortAnswerInProgress!
  }
`;

export default typeDefs;