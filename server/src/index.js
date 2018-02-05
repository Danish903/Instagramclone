import express from "express";
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { createServer } from "http";
import bodyParser from "body-parser";

import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

import "./config/db";
import constants from "./config/constants";
import mocks from "./mocks/mocks";

import middleware from "./config/middleware";
const app = express();
app.use(bodyParser.json());
const schema = makeExecutableSchema({ typeDefs, resolvers });


middleware(app);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH
  })
);

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
      req: req
    }
  }))
);

const graphqlServer = createServer(app);

// mocks().then(() => {
  graphqlServer.listen(constants.PORT, () => {
    console.log(`App listening on port: ${constants.PORT}`);
  });
// });
