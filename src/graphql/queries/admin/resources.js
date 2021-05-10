import gql from 'graphql-tag';

const RESOURCES = gql`
  query Resources($slug: ID!) {
    resources(slug: $slug) {
      topic {
        title
      }
      id
      url
      title
      description
      createdAt
      isInactive
    }
  }
`;

export {
  RESOURCES
}