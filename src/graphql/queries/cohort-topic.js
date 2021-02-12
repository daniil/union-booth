import gql from 'graphql-tag';

const UNLOCKED_TOPICS = gql`
  query UnlockedTopics {
    unlockedTopics {
      topic {
        id
        title
        slug
        createdAt
      }
      isLive
    }
  }
`;

const TOPIC = gql`
  query Topic($slug: ID!) {
    topic(slug: $slug) {
      topic {
        id
        title
      }
      isLive
    }
  }
`;

export {
  UNLOCKED_TOPICS,
  TOPIC
}