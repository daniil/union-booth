import gql from 'graphql-tag';

const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      username
      email
      role
      cohortId
      createdAt
    }
  }
`;

const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($userId: ID!) {
    updateUserAvatar(userId: $userId)
  }
`;

export {
  USER,
  UPDATE_USER_AVATAR
}