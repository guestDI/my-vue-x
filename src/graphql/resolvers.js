import users from "../__mocks__/users.json" assert { type: "json" };
import tweets from "../__mocks__/tweets.json" assert { type: "json" };

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  // Define resolvers for queries
  Query: {
    // Return all users // rename to authors
    users(_, args) {
      return users;
    },
    // Return all tweets
    tweets() {
      return tweets;
    },
    user: (_, args) => users.find((user) => user.id === args.id),
    // tweets: () => books,
    // Find a book by ID and return it
    // book: (parent, args) => books.find((book) => book.id === args.id),
    // // Return all authors
    // authors: () => authors,
    // // Find an author by ID and return them
    // author: (parent, args) => authors.find((author) => author.id === args.id),
  },
  Tweet: {
    author(parent) {
      return users.find((user) => user.id === parent.authorId);
    },
  },
  // Define resolvers for Author type fields
  //   Author: {
  //     // Return all books written by the author
  //     books: (parent) => books.filter((book) => book.authorId === parent.id),
  //   },
  // Define resolvers for Book type fields
  //   Book: {
  //     // Return the author of the book
  //     author: (parent) => authors.find((author) => author.id === parent.authorId),
  //   },
};

export default resolvers;
