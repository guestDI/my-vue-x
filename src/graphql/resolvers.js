// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  // Define resolvers for queries
  Query: {
    // Return all users // rename to authors
    authors(_, args, { db }) {
      return db.authors;
    },
    // Return all tweets
    tweets(_, args, { db }) {
      return db.tweets;
    },
    author: (_, args, { db }) => db.authors.find((user) => user.id === args.id),
    currentUser: (_, args, { db }) => db.currentUser,
  },
  Tweet: {
    author(parent, _, { db }) {
      return db.authors.find((user) => user.id === parent.authorId);
    },
  },
  Mutation: {
    addTweet(_, args, { db }) {
      const tweet = {
        ...args.data,
      };

      db.tweets.push(tweet);

      return tweet;
    },
  },
};

export default resolvers;
