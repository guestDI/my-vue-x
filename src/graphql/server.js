import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers.js";
import db from "../db.js";

export const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      users: [User!]!
      tweets: [Tweet]!
      user(id: ID!): User!
    }

    type Mutation {
      addTweet(data: CreateTweetInput!): Tweet
    }

    type User {
      id: ID!
      name: String!
      username: String!
      image: String
    }

    type Tweet {
      id: ID!
      text: String!
      author: User!
    }

    input CreateTweetInput {
      id: ID!
      text: String!
      author: ID!
    }
  `,
  resolvers: resolvers,
});

const yoga = createYoga({ schema, context: { db } });
const server = createServer(yoga);

// Start the server and you're done!
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
