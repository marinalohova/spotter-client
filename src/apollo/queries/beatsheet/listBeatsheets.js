/**
 * List beatsheets
 * @return {Promise<Object>}
 */
export default `
query ListBeatsheets {
  listBeatsheets {
    edges {
      id
      title
      acts {
        edges {
          id
          description
        }
      }
    }
  }
}
`;
