import gql from 'graphql-tag';

const ADD_PROGRAM = gql`
  mutation AddProgram($title: String!) {
    addProgram(title: $title) {
      title
    }
  }
`;

export {
  ADD_PROGRAM
}