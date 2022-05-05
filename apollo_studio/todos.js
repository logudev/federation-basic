const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const typeDefs = gql`
  type Todo {
    name: String
    isOpen: String
  }

  type Query {
    todos: [Todo]
  }
`;

const todos = [
  {
    name: "React Course",
    isOpen: "false",
  },
  {
    name: "Code Review",
    isOpen: "true",
  },
];

const resolvers = {
  Query: {
    todos: () => todos,
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen({ port: 5002 })
  .then(({ url }) => {
    console.log(`Subgraph Todos launched at ${url}`);
  })
  .catch((err) => console.log(err));
