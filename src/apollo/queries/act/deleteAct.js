import gql from 'graphql-tag';

/**
 * Delete act
 * @return {Promise<Object>}
 */
export default gql`
mutation DeleteAct($input: GetActInput!) {
  deleteAct(input: $input) {
    id
  }
}
`;
