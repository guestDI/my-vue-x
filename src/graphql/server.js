import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers.js";
import db from "../db.js";

export const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      authors: [Author!]!
      tweets: [Tweet!]!
      author(id: ID!): Author!
      currentUser: Author!
    }

    type Mutation {
      addTweet(data: CreateTweetInput!): Tweet!
    }

    type Author {
      id: ID!
      name: String!
      username: String!
      image: String
    }

    type Tweet {
      id: ID!
      text: String!
      author: Author!
    }

    input CreateTweetInput {
      id: ID!
      text: String!
      authorId: ID!
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
