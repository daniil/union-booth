import gql from 'graphql-tag';

const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($userId: ID!) {
    updateUserAvatar(userId: $userId)
  }
`;

export {
  UPDATE_USER_AVATAR
}