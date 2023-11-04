/* Apollo */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"

/* Application Modules */
import config from "./config/appConfig";
import DBConnectWithRetry from "./config/DBConfig";
import { logger } from "./config/logger";
import { mergedGQLSchema } from "./schemas";
import { resolvers } from "./resolvers";

const PORT = parseInt(config.port);

const server = new ApolloServer({
  typeDefs: mergedGQLSchema,
  resolvers: resolvers,
  introspection: true
})

const startServer = async () => {
  try {
    await DBConnectWithRetry();
    startStandaloneServer(server, { listen: { port: PORT } });
    logger.info(`Server running on port ${PORT}...`);
  } catch (error: any) {
    logger.error(error.message);
  }
}

startServer();
