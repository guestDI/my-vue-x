import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers.js";
import db from "../db.js";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      authors: [Author!]!
      tweets: [Tweet!]!
      author(id: ID!): Author!
      me: Author!
      posts(id: ID!): [Tweet]!
      authorTweets(authorId: ID!): [Tweet!]!
    }

    type Mutation {
      addTweet(data: CreateTweetInput!): Tweet!
      follow(authorId: ID!, id: ID!): Boolean!
      unfollow(authorId: ID!, id: ID!): Boolean!
      signUp(data: AuthPayload!): Author!
      signIn(username: String!): Author
      like(tweetId: ID!, userId: ID!): Int!
      unlike(tweetId: ID!, userId: ID!): Int!
    }

    type Author {
      recordId: ID!  
      name: String!
      username: String!
      image: String
      following: [String]!
      followers: [String]!
      tweets: [Tweet]!
      liked: [String]!
    }

    type Tweet {
      id: ID!
      tweetId: String!
      text: String!
      likes: Int!  
      author: Author!
    }

    input CreateTweetInput {
      text: String!
      authorId: ID!
    }
    
    input AuthPayload {
      username: String!
      name: String!
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
