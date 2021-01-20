import gql from 'graphql-tag';

const ADD_TOPIC = gql`
  mutation AddTopic($title: String!) {
    addTopic(title: $title) {
      id,
      title
    }
  }
`;

export {
  ADD_TOPIC
}