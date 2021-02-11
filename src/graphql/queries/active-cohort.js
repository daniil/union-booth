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

export {
  UNLOCKED_TOPICS
}