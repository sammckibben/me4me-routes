import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import json from "body-parser";
import { typeDefs } from "./schema.js";
import { books, reminders } from "./store.js";
import DateTimeISOResolver from "./DateTimeISOResolver.js";
const resolvers = {
    Query: {
        books: () => books,
        getReminder: (parent, args) => {
            const { id } = args; // Destructure the "id" argument from the args object
            // Implement the logic to fetch the reminder with the given ID (id)
            // and return the reminder object
            const reminder = {
                id: "1",
                message: "hello there"
            };
            return reminder;
        },
        reminders: () => reminders,
    },
    DateTimeISO: DateTimeISOResolver
};
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use("/graphql", cors(), json(), expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
}));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
