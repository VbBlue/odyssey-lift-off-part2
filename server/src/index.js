const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const TrackAPI = require("./dataSources/track-api");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  //const startStandaloneServer = await startStandaloneServer(server, {});

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;

      return {
        dataSources: {
          trackAPI: new TrackAPI(),
        },
      };
    },
  });

  console.log(`
      🚀  Server is running
      📭  Query at ${url}
    `);
}

startApolloServer();
