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

const USER_AVATAR_UPDATED = gql`
  subscription UserAvatarUpdated($userId: ID!) {
    userAvatarUpdated(userId: $userId)
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

const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($userId: ID!, $password: String!) {
    updateUserPassword(userId: $userId, password: $password)
  }
`;

const DEACTIVATE_USER_ACCOUNT = gql`
  mutation DeactivateUserAccount {
    deactivateUserAccount {
      id
    }
  }
`;

export {
  USER,
  UPDATE_USER_AVATAR,
  USER_AVATAR_UPDATED,
  UPDATE_USER_INFO,
  UPDATE_USER_PASSWORD,
  DEACTIVATE_USER_ACCOUNT
}