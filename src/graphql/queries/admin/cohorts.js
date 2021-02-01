import gql from 'graphql-tag';

const cohortInformation = gql`
  fragment CohortInformation on Cohort {
    id
    title
    slug
  }
`;

const ADD_COHORT = gql`
  mutation AddCohort($programId: ID!, $title: String!) {
    addCohort(programId: $programId, title: $title) {
      ...CohortInformation
    }
  }
  ${cohortInformation}
`;

const COHORTS = gql`
  query Cohorts($programId: ID!) {
    cohorts(programId: $programId) {
      ...CohortInformation
    }
  }
  ${cohortInformation}
`;

const TOGGLE_COHORT_SELECT = gql`
  mutation ToggleCohortSelect($id: ID!, $isSelected: Boolean!) {
    toggleCohortSelect(id: $id, isSelected: $isSelected) {
      ...CohortInformation
    }
  }
  ${cohortInformation}
`;

const SELECTED_COHORT = gql`
  query SelectedCohort {
    selectedCohort {
      ...CohortInformation
    }
  }
  ${cohortInformation}
`;

export {
  ADD_COHORT,
  COHORTS,
  TOGGLE_COHORT_SELECT,
  SELECTED_COHORT
}