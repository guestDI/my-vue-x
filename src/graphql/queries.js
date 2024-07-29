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

export const USER_QUERY = gql`
  query UserQuery($id: ID!) {
    character(id: $id) {
      id
      name
      image
    }
  }
`;
