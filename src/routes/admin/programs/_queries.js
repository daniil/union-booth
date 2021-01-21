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
      slug,
      isSelected
    }
  }
`;

const TOGGLE_PROGRAM_SELECT = gql`
  mutation ToggleProgramSelect($id: ID!, $isSelected: Boolean!) {
    toggleProgramSelect(id: $id, isSelected: $isSelected) {
      id,
      title,
      slug,
      isSelected
    }
  }
`;

export {
  ADD_PROGRAM,
  PROGRAMS,
  TOGGLE_PROGRAM_SELECT
}