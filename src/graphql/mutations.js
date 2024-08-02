import gql from "graphql-tag";

export const ADD_TWEET = gql`
  mutation addTweet($id: ID!, $text: String!, $authorId: ID!) {
    addTweet(data: { id: $id, text: $text, authorId: $authorId }) {
      id
      text
      author {
        id
        name
        image
        username
      }
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
