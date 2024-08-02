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
    follow(_, args, { db }) {
      const authorIdx = db.authors.findIndex((author) => author.id === args.authorId);
      if (authorIdx > -1 ) {
        db.authors[authorIdx].followers.push(args.id);
      }
      return args.id;
    },
    unfollow(_, args, { db }) {
      const authorIdx = db.authors.findIndex((author) => author.id === args.authorId);
      if (authorIdx > -1 ) {
        db.authors[authorIdx].followers.splice(args.id, 1)
      }
      return args.id;
    }
  },
};

export default resolvers;
