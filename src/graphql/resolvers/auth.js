import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';
import roleMap from 'utils/role-map';

export const isAuthenticated = (_, __, { session }) => {
  return session.user ? skip : new ForbiddenError('Not authenticated as user.');
};

export const checkRole = role => (_, __, { session }) => {
  const userRoles = roleMap[session.user.role];

  return userRoles.includes(role)
    ? skip
    : new ForbiddenError('Not authorized for this action');
};