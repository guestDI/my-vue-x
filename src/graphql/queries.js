import gql from "graphql-tag";

export const TWEETS_QUERY = gql`
  query TweetsQuery {
    tweets {
      tweetId
      text
      author {
        recordId
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
      name
      username
      image
      followers
      following
      tweets {
          id
          text
      }  
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
    query CurrentUserQuery {
        currentUser{
            name
            username
            image
            followers
            following
        }
    }
`;

export const USER_TWEETS_QUERY = gql`
    query UserTweetsQuery($id: ID!) {
        posts(id: $id) {
            id
            text
        }
    }
`;
