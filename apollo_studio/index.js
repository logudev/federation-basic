require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const gateway = new ApolloGateway();

const server = new ApolloServer({
  gateway,
  // Subscriptions are currently not supported in Apollo Federation
  subscriptions: false,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

server
  .listen({ port: 5003 })
  .then(({ url }) => {
    console.log(
      `Gateway launched via Apollo Studio Schema Composition at ${url}`
    );
  })
  .catch((err) => console.error(err));
