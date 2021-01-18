import gql from 'graphql-tag';

const ADD_PROGRAM = gql`
  mutation AddProgram($title: String!) {
    addProgram(title: $title) {
      id,
      title,
      slug
    }
  }
`;

const PROGRAMS = gql`
  query Programs {
    programs {
      id,
      title,
      slug
    }
  }
`;

export {
  ADD_PROGRAM,
  PROGRAMS
}