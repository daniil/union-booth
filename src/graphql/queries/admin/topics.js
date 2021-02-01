import gql from 'graphql-tag';

const ADD_TOPIC = gql`
  mutation AddTopic($programId: ID!, $title: String!) {
    addTopic(programId: $programId, title: $title) {
      id
      title
      slug
    }
  }
`;

const TOPICS = gql`
  query Topics($programId: ID!) {
    topics(programId: $programId) {
      id
      title
      slug
    }
  }
`;

export {
  ADD_TOPIC,
  TOPICS
}