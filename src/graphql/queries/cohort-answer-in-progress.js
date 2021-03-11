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

const UPDATE_COHORT_ANSWER_PROGRESS = gql`
  mutation UpdateCohortAnswerProgress($cohortQuestionId:ID!, $status:Boolean!) {
    updateCohortAnswerProgress(cohortQuestionId: $cohortQuestionId, status: $status) {
      ...CohortAnswerInProgressInformation
    }
  }
  ${cohortAnswerInProgressInformation}
`;

export {
  UPDATE_COHORT_ANSWER_PROGRESS
}