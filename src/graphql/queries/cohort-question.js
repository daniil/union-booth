import gql from 'graphql-tag';

const LIVE_QUESTIONS = gql`
  query LiveQuestions($cohortId: ID!, $topicId: ID!) {
    liveQuestions(cohortId: $cohortId, topicId: $topicId) {
      id
      question
      isAnonymous
      createdAt
    }
  }
`;

export {
  LIVE_QUESTIONS
}