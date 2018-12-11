import gql from "graphql-tag";

export const UPDATE_USER = gql`
  mutation($id: String!, $name: String!) {
    updateUsers(id: $id, name: $name) {
      id
      name
    }
  }
`;
