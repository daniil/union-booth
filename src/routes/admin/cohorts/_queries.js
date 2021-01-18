import gql from 'graphql-tag';

const ADD_COHORT = gql`
  mutation AddCohort($title: String!) {
    addCohort(title: $title) {
      id,
      title,
      slug
    }
  }
`;

const COHORTS = gql`
  query Cohorts {
    cohorts {
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