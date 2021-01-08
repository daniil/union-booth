import gql from 'graphql-tag';

const LOGIN = gql`
  mutation Login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
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
  LOGIN
}