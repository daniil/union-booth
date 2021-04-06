import gql from 'graphql-tag';

const TOPIC_FAQ_ADMIN = gql`
  query TopicFAQAdmin($slug: ID!) {
    topicFAQAdmin(slug: $slug) {
      topic {
        title
      }
      cohortQuestions {
        id
        question
        convertedToFAQ
        cohort {
          title
        }
        cohortAnswers {
          answer
        }
      }
    }
  }
`;

export {
  TOPIC_FAQ_ADMIN
}