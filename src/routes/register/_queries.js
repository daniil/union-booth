import gql from 'graphql-tag';

const REGISTER = gql`
  mutation Register(
    $firstName: String!,
    $lastName: String!,
    $username: String!,
    $email: String!,
    $password: String!,
    $isProgramOwner: Boolean!
  ) {
    register(
      firstName: $firstName,
      lastName: $lastName,
      username: $username,
      email: $email,
      password: $password,
      isProgramOwner: $isProgramOwner
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