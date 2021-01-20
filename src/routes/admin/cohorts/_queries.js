import gql from 'graphql-tag';

const ADD_COHORT = gql`
  mutation AddCohort($programId: ID!, $title: String!) {
    addCohort(programId: $programId, title: $title) {
      id,
      title,
      slug
    }
  }
`;

const COHORTS = gql`
  query Cohorts($programId: ID!) {
    cohorts(programId: $programId) {
      id,
      title,
      slug
    }
  }
`;

export {
  ADD_COHORT,
  COHORTS
}