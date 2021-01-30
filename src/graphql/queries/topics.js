import gql from 'graphql-tag';

const TOPICS = gql`
  query Topics {
    topics {
      id,
      title,
      slug,
      isActive,
      createdAt
    }
  }
`;

const TOPIC = gql`
  query Topic($slug: ID!) {
    topic(slug: $slug) {
      title,
      isActive,
      createdAt
    }
  }
`;

export {
  TOPICS,
  TOPIC
}