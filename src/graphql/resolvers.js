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
    posts: (_, args, { db }) => {
      return db.tweets.filter((tweet) => tweet.authorId === args.id);
    }
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
      //find user how start follow
      const userIdx = db.authors.findIndex((author) => author.id === args.id);
      if (authorIdx > -1 ) {
        db.authors[authorIdx].followers.push(args.id);
        db.authors[userIdx].following.push(args.authorId);
      }

      return args.id;
    },
    unfollow(_, args, { db }) {
      const authorIdx = db.authors.findIndex((author) => author.id === args.authorId);
      if (authorIdx > -1 ) {
        db.authors[authorIdx].followers.splice(args.id, 1)
        // db.currentUser.following = db.currentUser.following.filter((user) => user !== args.authorId)
      }
      return args.id;
    }
  },
};

export default resolvers;
