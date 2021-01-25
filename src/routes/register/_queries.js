import gql from 'graphql-tag';

const REGISTER = gql`
  mutation Register(
    $firstName: String!,
    $lastName: String!,
    $username: String!,
    $email: String!,
    $password: String!,
    $isProgramOwner: Boolean!,
    $cohortId: ID
  ) {
    register(
      firstName: $firstName,
      lastName: $lastName,
      username: $username,
      email: $email,
      password: $password,
      isProgramOwner: $isProgramOwner,
      cohortId: $cohortId
    ) {
      id
      firstName
      lastName
      username
      email
      role
    }
  }
`;

export {
  REGISTER
}