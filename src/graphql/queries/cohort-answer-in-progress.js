import gql from 'graphql-tag';

const cohortAnswerInProgressInformation = gql`
  fragment CohortAnswerInProgressInformation on CohortAnswerInProgress {
    createdAt
    user {
      id
      username
    }
    isActive
  }
`;

const ANSWERS_IN_PROGRESS = gql`
  query AnswersInProgress($cohortQuestionId: ID!) {
    answersInProgress(cohortQuestionId: $cohortQuestionId) {
      ...CohortAnswerInProgressInformation
    }
  }
  ${cohortAnswerInProgressInformation}
`;

const UPDATE_COHORT_ANSWER_PROGRESS = gql`
  mutation UpdateCohortAnswerProgress($cohortQuestionId:ID!, $status:Boolean!) {
    updateCohortAnswerProgress(cohortQuestionId: $cohortQuestionId, status: $status) {
      ...CohortAnswerInProgressInformation
    }
  }
  ${cohortAnswerInProgressInformation}
`;

export {
  ANSWERS_IN_PROGRESS,
  UPDATE_COHORT_ANSWER_PROGRESS
}