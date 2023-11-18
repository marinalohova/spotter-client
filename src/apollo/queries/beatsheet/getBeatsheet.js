/**
 * Get act
 * @return {Promise<Object>}
 */
export default `
query GetBeatsheet($input: GetBeatsheetInput!) {
  getBeatsheet(input: $input) {
    id
    title
    acts {
      edges {
        id
        description
        beats {
          edges {
            id
            title
            description 
            duration
            cameraAngle
          }
        }
      }
    }
  }
}
`;
