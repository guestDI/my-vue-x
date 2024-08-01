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