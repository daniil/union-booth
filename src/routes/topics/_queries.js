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

export {
  TOPICS
}