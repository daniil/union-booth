import gql from 'graphql-tag';

const programInformation = gql`
  fragment ProgramInformation on Program {
    id,
    title,
    slug,
    isSelected
  }
`;

const ADD_PROGRAM = gql`
  mutation AddProgram($title: String!) {
    addProgram(title: $title) {
      ...ProgramInformation
    }
  }
  ${programInformation}
`;

const PROGRAMS = gql`
  query Programs {
    programs {
      ...ProgramInformation
    }
  }
  ${programInformation}
`;

const TOGGLE_PROGRAM_SELECT = gql`
  mutation ToggleProgramSelect($id: ID!, $isSelected: Boolean!) {
    toggleProgramSelect(id: $id, isSelected: $isSelected) {
      ...ProgramInformation
    }
  }
  ${programInformation}
`;

export {
  ADD_PROGRAM,
  PROGRAMS,
  TOGGLE_PROGRAM_SELECT
}