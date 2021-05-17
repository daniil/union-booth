import gql from 'graphql-tag';

const TOPIC_RESOURCES = gql`
  query TopicResources($slug: ID!) {
    topicResources(slug: $slug) {
      topic {
        id
        title
      }
      resources {
        id
        url
        title
        description
        createdAt
        isInactive
      }
    }
  }
`;

const ADD_RESOURCE = gql`
  mutation AddResource($id: ID, $topicId: ID!, $url: String!, $title: String!, $description: String!) {
    addResource(id: $id, topicId: $topicId, url: $url, title: $title, description: $description) {
      id
      url
      title
      description
      topic {
        title
      }
    }
  }
`;

export {
  TOPIC_RESOURCES,
  ADD_RESOURCE
}