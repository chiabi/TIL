import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://graphql-crud-server.herokuapp.com/graphql"
});

export default client;