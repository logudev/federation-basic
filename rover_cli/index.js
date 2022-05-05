const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const { readFileSync } = require("fs");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const supergraphSdl = readFileSync("./supergraph.graphql").toString();

const gateway = new ApolloGateway({
  supergraphSdl,
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen({ port: 4003 })
  .then(({ url }) => {
    console.log(
      `Gateway launched via Local Rover CLI Schema Composition at ${url}`
    );
  })
  .catch((err) => console.error(err));
