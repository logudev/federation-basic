const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const typeDefs = gql`
  type User {
    name: String
    gender: String
    age: Int
  }

  type Query {
    users: [User]
  }
`;

const users = [
  {
    name: "Logu",
    gender: "Male",
    age: 28,
  },
  {
    name: "Neeru",
    gender: "Female",
    age: 27,
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
  .listen({ port: 4001 })
  .then(({ url }) => {
    console.log(`Subgraph Users launched at ${url}`);
  })
  .catch((err) => console.log(err));
