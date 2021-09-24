import gql from 'graphql-tag';

const cohortQuestionInformation = gql`
  fragment CohortQuestionInformation on CohortQuestion {
    id
    question
    isAnonymous
    createdAt
    updatedAt
    isInactive
    user {
      id
      username
      firstName
      lastName
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
  mutation AddCohortQuestion($questionId: ID, $topicId: ID!, $question: String!, $isAnonymous: Boolean!) {
    addCohortQuestion(questionId: $questionId, topicId: $topicId, question: $question, isAnonymous: $isAnonymous) {
      ...CohortQuestionInformation
    }
  }
  ${cohortQuestionInformation}
`;

const NEW_COHORT_QUESTION = gql`
  subscription NewCohortQuestion($cohortId: ID!, $topicId: ID!) {
    newCohortQuestion(cohortId: $cohortId, topicId: $topicId) {
      ...CohortQuestionInformation
    }
  }
  ${cohortQuestionInformation}
`;

const COHORT_QUESTION_UPDATED = gql`
  subscription CohortQuestionUpdated($cohortId: ID!, $topicId: ID!) {
    cohortQuestionUpdated(cohortId: $cohortId, topicId: $topicId) {
      ...CohortQuestionInformation
    }
  }
  ${cohortQuestionInformation}
`;

const DEACTIVATE_COHORT_QUESTION = gql`
  mutation DeactivateCohortQuestion($cohortQuestionId: ID!) {
    deactivateCohortQuestion(cohortQuestionId: $cohortQuestionId) {
      ...CohortQuestionInformation
    }
  }
  ${cohortQuestionInformation}
`;

const COHORT_QUESTION_DEACTIVATED = gql`
  subscription CohortQuestionDeactivated($cohortId: ID!, $topicId: ID!) {
    cohortQuestionDeactivated(cohortId: $cohortId, topicId: $topicId) {
      ...CohortQuestionInformation
    }
  }
  ${cohortQuestionInformation}
`;

const TOGGLE_COHORT_QUESTION_UPVOTE = gql`
  mutation ToggleCohortQuestionUpvote($cohortQuestionId: ID!, $isAdd: Boolean!) {
    toggleCohortQuestionUpvote(cohortQuestionId: $cohortQuestionId, isAdd: $isAdd)
  }
`;

export {
  LIVE_QUESTIONS,
  ADD_COHORT_QUESTION,
  NEW_COHORT_QUESTION,
  COHORT_QUESTION_UPDATED,
  DEACTIVATE_COHORT_QUESTION,
  COHORT_QUESTION_DEACTIVATED,
  TOGGLE_COHORT_QUESTION_UPVOTE
}