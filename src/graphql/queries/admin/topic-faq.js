import gql from 'graphql-tag';

const TOPIC_FAQ_ADMIN = gql`
  query TopicFAQAdmin($slug: ID!) {
    topicFAQAdmin(slug: $slug) {
      topic {
        title
      }
      topicFAQQuestions {
        id
        question
        answer
        createdAt
        cohortQuestion {
          id
        }
      }
      cohortQuestions {
        id
        question
        convertedToFAQ
        cohort {
          title
        }
        cohortAnswers {
          id
          answer
        }
      }
    }
  }
`;

export {
  TOPIC_FAQ_ADMIN
}