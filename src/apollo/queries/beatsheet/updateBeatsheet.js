import gql from 'graphql-tag';

/**
 * Update Beatsheet
 * @return {Promise<Object>}
 */
export default gql`
mutation UpdateBeatsheet($input: UpdateBeatsheetInput!) {
  updateBeatsheet(input: $input) {
   id
  }
}
`;
