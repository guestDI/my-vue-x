import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers.js";
import db from "../db.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      authors: [Author!]!
      tweets: [Tweet!]!
      author(id: ID!): Author!
      posts(id: ID!): [Tweet]!  
    }

    type Mutation {
      addTweet(data: CreateTweetInput!): Tweet!
      follow(authorId: ID!, id: ID!): String!
      unfollow(authorId: ID!, id: ID!): String!
    }

    type Author {
      recordId: ID!  
      name: String!
      username: String!
      image: String
      following: [String]!
      followers: [String]!
      tweets: [Tweet]!
    }

    type Tweet {
      id: ID!
      tweetId: String!
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

const yoga = createYoga({ schema, context: { db, prisma } });
const server = createServer(yoga);

// Start the server and you're done!
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
