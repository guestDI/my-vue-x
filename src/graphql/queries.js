import gql from "graphql-tag";

export const TWEETS_QUERY = gql`
  query TweetsQuery {
    tweets {
      tweetId
      text
      likes  
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
      recordId  
      name
      username
      image
      followers
      following
      liked
    }
  }
`;

export const AUTHOR_TWEETS = gql`
  query AuthorTweetsQuery($authorId: ID!) {
    authorTweets(authorId: $authorId){
      tweetId
      text
    }
  }
`

export const ME = gql`
  query MeQuery {
    me {
      recordId  
      liked
    }
  }
`
