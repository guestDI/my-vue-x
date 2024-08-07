import { v4 as uuidv4 } from "uuid";
import { authorLoader } from "./loaders/authorLoader.js";

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  // Define resolvers for queries
  Query: {
    async me(_, args, { prisma }) {
      return prisma.author.findUnique({
        where: {
          recordId: "60959239-a936-481b-9b6c-cc8f49aa3cd5",
        },
      })
    },
    // Return all authors
    async authors(_, args, { prisma }) {
      return prisma.author.findMany({
        orderBy: [{
          name: "desc"
        }]
      });
    },
    // Return all tweets
    async tweets(_, args, { prisma }) {
      const res = await prisma.tweet.findMany({
        orderBy: [{
          createdAt: "desc"
        }]
      });
      return res
    },
    async author(_, args, { prisma }) {
      return prisma.author.findUnique({
        where: {
          recordId: args.id,
        },
      })
    },
    authorTweets: (_, { authorId }, { prisma }) => {
      return prisma.tweet.findMany({
        where: {
          authorId: authorId,
        },
        orderBy: [{
          createdAt: "desc"
        }]
      });
    },

  },
  Tweet: {
    async author(parent, _, context) {
      return authorLoader.load(parent.authorId)
    },
    async comments(parent, _, { prisma }) {
      return prisma.comment.findMany({
        where: {
          tweetRecordId: parent.tweetId
        }
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
    addTweet(_, args, { prisma }) {
      return prisma.tweet.create({
        data: {
          tweetId: uuidv4(),
          text: args.data.text,
          authorId: args.data.authorId
        }
      })
    },
    addComment(_, { data: { tweetId, userId, text } }, { prisma }) {
      return prisma.comment.create({
        data: {
          commentId: uuidv4(),
          text: text,
          tweetRecordId: tweetId,
          authorId: userId,
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
    async unfollow(_, { authorId, id }, { db, prisma }) {
      const authorObj = await prisma.author.findUnique({
        where: {
          recordId: authorId,
        },
      });

      const followerObj = await prisma.author.findUnique({
        where: {
          recordId: id,
        },
      });

      const updatedFollowers = authorObj.followers.filter((follower) => follower !== id);
      const updatedFollowing = followerObj.following.filter((following) => following !== authorId);

      const res = await prisma.$transaction(
        [
          prisma.author.update({
            where: {
              recordId: authorId,
            },
            data: {
              followers: updatedFollowers,
            },
          }),
          prisma.author.update({
            where: {
              recordId: id,
            },
            data: {
              following: updatedFollowing,
            },
          })
        ]
      )

      return !!res?.length;

    },
    async like(_, { tweetId, userId }, { prisma }) {
      const tweetObj = await prisma.tweet.findUnique({
        where: {
          tweetId: tweetId,
        },
      })

      const likes = tweetObj.likes + 1;

      const userObj = await prisma.author.findUnique({
        where: {
          recordId: userId,
        },
      })

      await prisma.$transaction(
        [
          prisma.tweet.update({
            where: {
              tweetId: tweetId,
            },
            data: {
              likes: likes,
            },
          }),
          prisma.author.update({
            where: {
              recordId: userId,
            },
            data: {
              liked: [...userObj.liked, tweetId],
            },
          })
        ]
      )

      return likes;
    },
    async unlike(_, { tweetId, userId }, { prisma }) {
      const tweetObj = await prisma.tweet.findUnique({
        where: {
          tweetId: tweetId,
        },
      })

      const likes =  tweetObj.likes > 0 ? tweetObj.likes - 1 : 0;

      const userObj = await prisma.author.findUnique({
        where: {
          recordId: userId,
        },
      })

      const updatedLiked = userObj.liked.filter((l) => l !== tweetId);

      await prisma.$transaction(
        [
          prisma.tweet.update({
            where: {
              tweetId: tweetId,
            },
            data: {
              likes: likes,
            },
          }),
          prisma.author.update({
            where: {
              recordId: userId,
            },
            data: {
              liked: updatedLiked,
            },
          })
        ]
      )

      return likes;
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
