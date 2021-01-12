import gql from 'graphql-tag';

const TOPICS = gql`
  query Topics {
    topics {
      id,
      title,
      isActive,
      createdAt
    }
  }
`;

const TOPIC = gql`
  query Topic($id: ID!) {
    topic(id: $id) {
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