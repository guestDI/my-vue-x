import { v4 as uuidv4 } from "uuid";

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  // Define resolvers for queries
  Query: {
    // Return all users // rename to authors
    users(_, args, { db }) {
      return db.authors;
    },
    // Return all tweets
    tweets(_, args, { db }) {
      return db.tweets;
    },
    user: (_, args, { db }) => db.authors.find((user) => user.id === args.id),
  },
  Tweet: {
    author(parent, _, { db }) {
      return db.authors.find((user) => user.id === parent.authorId);
    },
  },
  Mutation: {
    addTweet(_, args, context) {
      const tweet = {
        id: uuidv4(),
        ...args.data,
      };

      return tweet;
    },
  },
};

export default resolvers;
