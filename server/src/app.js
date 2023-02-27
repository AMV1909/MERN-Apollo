import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apollo Server
await server.start();
app.use("/graphql", expressMiddleware(server));

// Routes

export { app };
