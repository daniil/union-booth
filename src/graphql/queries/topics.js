import gql from 'graphql-tag';

const UNLOCKED_TOPICS = gql`
  query UnlockedTopics {
    unlockedTopics {
      id
      title
      slug,
      createdAt
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
  UNLOCKED_TOPICS,
  TOPIC
}