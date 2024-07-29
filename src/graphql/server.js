import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers.js";

export const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      users: [User!]!
      comments: [Tweet!]!
    }

    type User {
      id: ID!
      name: String!
      username: String!
      image: String
      comments: [Tweet!]!
    }

    type Tweet {
      id: ID!
      text: String!
      author: User!
    }
  `,
  resolvers: resolvers,
});

const yoga = createYoga({ schema });
const server = createServer(yoga);

// Start the server and you're done!
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
