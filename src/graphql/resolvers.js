// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  // Define resolvers for queries
  Query: {
    // Return all users // rename to authors
    async authors(_, args, { prisma }) {
      return prisma.author.findMany({
        orderBy: [{
          name: "desc"
        }]
      });
    },
    // Return all tweets
    async tweets(_, args, { prisma }) {
      return prisma.tweet.findMany({
        orderBy: [{
          createdAt: "desc"
        }]
      });
    },
    async author(_, args, { prisma }) {
      return await prisma.author.findUnique({
        where: {
          recordId: args.id,
        },
      })
    },
    posts: (_, args, { db }) => {
      return db.tweets.filter((tweet) => tweet.authorId === args.id);
    }
  },
  Tweet: {
    async author(parent, _, { prisma }) {
      return await prisma.author.findUnique({
        where: {
          recordId: parent.authorId,
        },
      })
    },
  },
  Author: {
    async tweets(parent, _, { prisma }) {
      return prisma.tweet.findMany({
        where: {
          authorId: parent.recordId
        },
        orderBy: [{
          createdAt: "desc"
        }]
      })
    }
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
