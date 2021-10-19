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

const ADD_TOPIC_CHEATSHEET = gql`
  mutation AddTopicCheatsheet($topicId: ID!, $details: String!) {
    addTopicCheatsheet(topicId: $topicId, details: $details) {
      id
      title
      cheatsheet
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
  ADD_TOPIC_CHEATSHEET,
  TOPICS
}