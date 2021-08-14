import gql from 'graphql-tag';

const APP_VERSION = gql`
  query AppVersion {
    appVersion
  }
`;

export {
  APP_VERSION
}