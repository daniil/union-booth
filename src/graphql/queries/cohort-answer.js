import gql from 'graphql-tag';

const cohortAnswerInformation = gql`
  fragment CohortAnswerInformation on CohortAnswer {
    id
    answer
    createdAt
    user {
      id
      username
    }
  }
`;

const LIVE_ANSWERS = gql`
  query LiveAnswers($cohortQuestionId: ID!) {
    liveAnswers(cohortQuestionId: $cohortQuestionId) {
      ...CohortAnswerInformation
    }
  }
  ${cohortAnswerInformation}
`;

const ADD_COHORT_ANSWER = gql`
  mutation AddCohortAnswer($cohortQuestionId:ID!, $answer:String!) {
  addCohortAnswer(cohortQuestionId: $cohortQuestionId, answer: $answer) {
    ...CohortAnswerInformation
    }
  }
  ${cohortAnswerInformation}
`;

const NEW_COHORT_ANSWER = gql`
  subscription NewCohortAnswer($cohortQuestionId: ID!) {
    newCohortAnswer(cohortQuestionId: $cohortQuestionId) {
      ...CohortAnswerInformation
    }
  }
  ${cohortAnswerInformation}
`;

export {
  LIVE_ANSWERS,
  ADD_COHORT_ANSWER,
  NEW_COHORT_ANSWER
}