import gql from 'graphql-tag';

const topicInformation = gql`
  fragment TopicInformation on Topic {
    id
    title
    slug
  }
`;

const resourceInformation = gql`
  fragment ResourceInformation on Resource {
    id
    url
    title
    description
    createdAt
  }
`;

const TOPIC_RESOURCES = gql`
  query TopicResources($slug: ID!) {
    topicResources(slug: $slug) {
      topic {
        ...TopicInformation
      }
      resources {
        ...ResourceInformation
      }
    }
  }
  ${topicInformation}
  ${resourceInformation}
`;

const ADD_RESOURCE = gql`
  mutation AddResource($id: ID, $topicId: ID!, $url: String!, $title: String!, $description: String!) {
    addResource(id: $id, topicId: $topicId, url: $url, title: $title, description: $description) {
      ...ResourceInformation
      topic {
        ...TopicInformation
      }
    }
  }
  ${resourceInformation}
  ${topicInformation}
`;

const DEACTIVATE_RESOURCE = gql`
  mutation DeactivateResource($id: ID!) {
    deactivateResource(id: $id) {
      ...ResourceInformation
      topic {
        ...TopicInformation
      }
    }
  }
  ${resourceInformation}
  ${topicInformation}
`;

export {
  TOPIC_RESOURCES,
  ADD_RESOURCE,
  DEACTIVATE_RESOURCE
}