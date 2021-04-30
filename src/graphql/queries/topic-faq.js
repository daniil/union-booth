import gql from 'graphql-tag';

const TOPIC_FAQ = gql`
  query TopicFAQ($slug: ID!) {
    topicFAQ(slug: $slug) {
      topic {
        id
        title
      }
      topicFAQQuestions {
        id
        question
        answer
        createdAt
      }
    }
  }
`;

export {
  TOPIC_FAQ
}