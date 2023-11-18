/**
 * List acts
 * @return {Promise<Object>}
 */
export default `
query ListActs {
  listActs {
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
        total
      }
    }
    total
  }
}
`;
