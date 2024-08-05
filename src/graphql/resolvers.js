import { v4 as uuidv4 } from "uuid";

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
      return prisma.author.findUnique({
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
    addTweet(_, args, { db, prisma }) {
      return prisma.tweet.create({
        data: {
          tweetId: uuidv4(),
          text: args.data.text,
          authorId: args.data.authorId
        }
      })
    },
    async follow(_, { authorId, id }, { prisma }) {
      const authorObj = await prisma.author.findUnique({
        where: {
          recordId: authorId,
        },
      })

      const followerObj = await prisma.author.findUnique({
        where: {
          recordId: id,
        },
      })

      const res = await prisma.$transaction(
        [
          prisma.author.update({
            where: {
              recordId: authorId,
            },
            data: {
              followers: [...authorObj.followers, id],
            },
          }),
          prisma.author.update({
            where: {
              recordId: id,
            },
            data: {
              following: [...followerObj.following, authorId],
            },
          })
        ]
      )

      return !!res?.length;
    },
    unfollow(_, args, { db }) {
      const authorIdx = db.authors.findIndex((author) => author.id === args.authorId);
      if (authorIdx > -1 ) {
        db.authors[authorIdx].followers.splice(args.id, 1)
        // db.currentUser.following = db.currentUser.following.filter((user) => user !== args.authorId)
      }
      return args.id;
    },
    async signUp(_, { name, username }, { prisma }) {
      const recordId = uuidv4();

      return prisma.author.create({
        data: {
          name,
          username,
          recordId,
        }
      })
    },
    async signIn(_, { username }, { prisma }) {
      const author = await prisma.author.findFirst({
        where: {
          username: username,
        },
      })
      return !!author ? author : null;
    }
  },
};



export default resolvers;
