import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./fakedb.js";

const typeDefs = gql`
  type Query {
    users: [User]
    qoutes: [Qoutes]
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    quotes: [Qoutes]
  }

  type Qoutes {
    name: String
    by: String
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    qoutes: () => quotes,
  },
  User: {
    quotes: (ur) => quotes.filter((qoute) => qoute.by == ur.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
