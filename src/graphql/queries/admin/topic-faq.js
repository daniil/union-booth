import gql from 'graphql-tag';

const TOPIC_FAQ_ADMIN = gql`
  query TopicFAQAdmin($slug: ID!) {
    topicFAQAdmin(slug: $slug) {
      topic {
        title
      }
    }
  }
`;

export {
  TOPIC_FAQ_ADMIN
}