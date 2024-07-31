import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      name
      username
      image
    }
  }
`;

export const TWEETS_QUERY = gql`
  query TweetsQuery {
    tweets {
      id
      text
      author {
        id
        name
        username
        image
      }
    }
  }
`;

export const AUTHOR_QUERY = gql`
  query AuthorQuery($id: ID!) {
    author(id: $id) {
      id
      name
      username
      image
    }
  }
`;
