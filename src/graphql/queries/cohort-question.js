import gql from 'graphql-tag';

const LIVE_QUESTIONS = gql`
  query LiveQuestions($cohortId: ID!, $topicId: ID!) {
    liveQuestions(cohortId: $cohortId, topicId: $topicId) {
      id
      question
      isAnonymous
      createdAt
      user {
        username
      }
    }
  }
`;

export {
  LIVE_QUESTIONS
}