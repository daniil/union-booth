import gql from 'graphql-tag';

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
  TOPIC
}