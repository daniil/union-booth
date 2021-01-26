import gql from 'graphql-tag';

const ADD_TOPIC = gql`
  mutation AddTopic($title: String!) {
    addTopic(title: $title) {
      id,
      title
    }
  }
`;

const TOPICS = gql`
  query Topics($programId: ID!) {
    topics(programId: $programId) {
      id,
      title,
      slug
    }
  }
`;

export {
  ADD_TOPIC,
  TOPICS
}