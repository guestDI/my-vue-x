import gql from "graphql-tag";

export const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    recordId
    name
    username
    image
    followers
    following
    liked
  }
`;

export const TWEET_DETAILS = gql`
  fragment TweetDetails on Tweet {
    tweetId
    text
    likes
    comments {
        text
    }
    author {
        ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const SIMPLE_TWEET_DETAILS = gql`
  fragment SimpleTweetDetails on Tweet {
    tweetId
    text
  }
`;

export const TWEETS_QUERY = gql`
  query TweetsQuery {
    tweets {
      ...TweetDetails
    }
  }
  ${TWEET_DETAILS}
`;

export const AUTHOR_QUERY = gql`
  query AuthorQuery($id: ID!) {
    author(id: $id) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const AUTHOR_TWEETS = gql`
  query AuthorTweetsQuery($authorId: ID!) {
    authorTweets(authorId: $authorId) {
      ...SimpleTweetDetails
    }
  }
  ${SIMPLE_TWEET_DETAILS}
`

export const ME = gql`
  query MeQuery {
    me {
      recordId  
      liked
      following  
    }
  }
`
