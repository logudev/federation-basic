const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const typeDefs = gql`
  type Book {
    title: String
    author: String
    genre: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    genre: "Fiction",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    genre: "Comedy",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen({ port: 4002 })
  .then(({ url }) => {
    console.log(`Subgraph Books launched at ${url}`);
  })
  .catch((err) => console.log(err));
