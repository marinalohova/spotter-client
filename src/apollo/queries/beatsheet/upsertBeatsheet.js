import gql from 'graphql-tag';

/**
 * Upsert Beatsheet
 * @return {Promise<Object>}
 */
export default gql`
mutation UpsertBeatsheet($input: UpsertBeatsheetInput!) {
  upsertBeatsheet(input: $input) {
   id
  }
}
`;
