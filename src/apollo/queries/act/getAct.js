/**
 * Get act
 * @return {Promise<Object>}
 */
export default `
query GetAct($input: GetActInput!) {
  getAct(input: $input) {
    id
    description
    beats {
      edges {
        id
        duration
      }
    }
  }
}
`;
