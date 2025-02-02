import gql from "graphql-tag";

export const ADD_TWEET = gql`
  mutation addTweet($text: String!, $authorId: ID!) {
    addTweet(data: { text: $text, authorId: $authorId }) {
      tweetId  
      text
      author {
        recordId
        name
        image
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($text: String!, $tweetId: ID!, $userId: ID!) {
    addComment(data: { text: $text, tweetId: $tweetId, userId: $userId }) {
      commentId
      text
    }
  }
`;

export const FOLLOW = gql`
  mutation follow($authorId: ID!, $id: ID!) {
    follow(authorId: $authorId, id: $id) 
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($authorId: ID!, $id: ID!) {
    unfollow(authorId: $authorId, id: $id)
  }
`;

export const LIKE = gql`
  mutation like($tweetId: ID!, $userId: ID!) {
    like(tweetId: $tweetId, userId: $userId)
  }
`;

export const UNLIKE = gql`
  mutation unlike($tweetId: ID!, $userId: ID!) {
    unlike(tweetId: $tweetId, userId: $userId)
  }
`;

