import gql from 'graphql-tag';

const TOPIC_RESOURCES = gql`
  query TopicResources($slug: ID!) {
    topicResources(slug: $slug) {
      topic {
        title
      }
      resources {
        id
        url
        title
        description
        createdAt
        isInactive
      }
    }
  }
`;

export {
  TOPIC_RESOURCES
}