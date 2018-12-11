import gql from "graphql-tag";

export const REMOVE_USER = gql`
  mutation($id: String!) {
    removeUsers(id: $id) {
      id
      name
    }
  }
`;
