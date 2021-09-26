import gql from 'graphql-tag';

const COHORT_QUESTION_UPVOTES = gql`
  query CohortQuestionUpvotes($cohortQuestionId: ID!) {
    cohortQuestionUpvotes(cohortQuestionId: $cohortQuestionId) {
      cohortQuestion {
        id
      }
      user {
        id
      }
    } 
  }
`;

const TOGGLE_COHORT_QUESTION_UPVOTE = gql`
  mutation ToggleCohortQuestionUpvote($cohortQuestionId: ID!, $isAdd: Boolean!) {
    toggleCohortQuestionUpvote(cohortQuestionId: $cohortQuestionId, isAdd: $isAdd)
  }
`;

const COHORT_QUESTION_UPVOTE_UPDATED = gql`
  subscription CohortQuestionUpvoteUpdated($cohortQuestionId: ID!) {
    cohortQuestionUpvoteUpdated(cohortQuestionId: $cohortQuestionId) {
      cohortQuestion {
        id
      }
      user {
        id
      }
      isAdd
    }
  }
`;

export {
  COHORT_QUESTION_UPVOTES,
  TOGGLE_COHORT_QUESTION_UPVOTE,
  COHORT_QUESTION_UPVOTE_UPDATED
}