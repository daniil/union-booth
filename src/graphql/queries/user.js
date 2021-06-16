import gql from 'graphql-tag';

const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($userId: ID!) {
    updateUserAvatar(userId: $userId)
  }
`;

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($userId: ID!, $firstName: String, $lastName: String, $username: String, $email: String) {
    updateUserInfo(userId: $userId, firstName: $firstName, lastName: $lastName, username: $username, email: $email) {
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
  USER,
  UPDATE_USER_AVATAR,
  UPDATE_USER_INFO
}