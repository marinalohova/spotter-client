import gql from 'graphql-tag';

/**
 * Create act
 * @return {Promise<Object>}
 */
export default gql`
mutation CreateAct($input: CreateActInput!) {
  createAct(input: $input) {
    id
  }
}`;
