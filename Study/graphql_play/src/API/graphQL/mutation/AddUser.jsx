import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }
`;
