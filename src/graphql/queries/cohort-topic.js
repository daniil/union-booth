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

const LIVE_TOPIC = gql`
  query LiveTopic {
    liveTopic {
      topic {
        id
        title
      }
      cohortId
    }
  }
`;

export {
  UNLOCKED_TOPICS,
  TOPIC,
  LIVE_TOPIC
}