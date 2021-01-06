import gql from 'graphql-tag';

const LOGIN_USER = gql`
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
  LOGIN_USER
}