import gql from 'graphql-tag';

const COHORT_ANSWER_UPVOTES = gql`
  query CohortAnswerUpvotes($cohortAnswerId: ID!) {
    cohortAnswerUpvotes(cohortAnswerId: $cohortAnswerId) {
      cohortAnswer {
        id
      }
      user {
        id
      }
    } 
  }
`;

const TOGGLE_COHORT_ANSWER_UPVOTE = gql`
  mutation ToggleCohortAnswerUpvote($cohortAnswerId: ID!, $isAdd: Boolean!) {
    toggleCohortAnswerUpvote(cohortAnswerId: $cohortAnswerId, isAdd: $isAdd)
  }
`;

const COHORT_ANSWER_UPVOTE_UPDATED = gql`
  subscription CohortAnswerUpvoteUpdated($cohortAnswerId: ID!) {
    cohortAnswerUpvoteUpdated(cohortAnswerId: $cohortAnswerId) {
      cohortAnswer {
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
  COHORT_ANSWER_UPVOTES,
  TOGGLE_COHORT_ANSWER_UPVOTE,
  COHORT_ANSWER_UPVOTE_UPDATED
}