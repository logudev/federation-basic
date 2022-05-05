const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const typeDefs = gql`
  type User {
    name: String
    job: String
  }

  type Query {
    users: [User]
  }
`;

const users = [
  {
    name: "Logu",
    job: "Frontend",
  },
  {
    name: "Neeru",
    job: "Backend",
  },
];

const resolvers = {
  Query: {
    users: () => users,
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen({ port: 5001 })
  .then(({ url }) => {
    console.log(`Subgraph Users launched at ${url}`);
  })
  .catch((err) => console.error(err));
