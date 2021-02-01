import gql from 'graphql-tag';

const TOPICS = gql`
  query Topics {
    topics {
      id
      title
      slug
      isActive
      createdA
    }
  }
`;

const TOPIC = gql`
  query Topic($slug: ID!) {
    topic(slug: $slug) {
      title
      isActive
      createdAt
    }
  }
`;

export {
  TOPICS,
  TOPIC
}