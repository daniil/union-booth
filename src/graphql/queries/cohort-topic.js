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
        cheatsheet
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
        cheatsheet
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