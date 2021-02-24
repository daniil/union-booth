import gql from 'graphql-tag';

const cohortQuestionInformation = gql`
  fragment CohortQuestionInformation on CohortQuestion {
    id
    question
    isAnonymous
    createdAt
    user {
      id
      username
    }
  }
`;

const LIVE_QUESTIONS = gql`
  query LiveQuestions($cohortId: ID!, $topicId: ID!) {
    liveQuestions(cohortId: $cohortId, topicId: $topicId) {
      ...CohortQuestionInformation
    }
  }
  ${cohortQuestionInformation}
`;

const ADD_COHORT_QUESTION = gql`
  mutation AddCohortQuestion($topicId: ID!, $question: String!, $isAnonymous: Boolean!) {
    addCohortQuestion(topicId: $topicId, question: $question, isAnonymous: $isAnonymous) {
      ...CohortQuestionInformation
    }
  }
  ${cohortQuestionInformation}
`;

const NEW_COHORT_QUESTION = gql`
  subscription NewCohortQuestion($cohortId: ID!, $topicId: ID!){
    newCohortQuestion(cohortId: $cohortId, topicId: $topicId) {
      ...CohortQuestionInformation
    }
  },
  ${cohortQuestionInformation}
`;

export {
  LIVE_QUESTIONS,
  ADD_COHORT_QUESTION,
  NEW_COHORT_QUESTION
}