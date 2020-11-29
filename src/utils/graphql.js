import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
query {
  getPosts {
    id
    body
    username
    createdAt
    likesCount
    likes {
      username
    }
    commentsCount
    comments {
      username
      body
    }
    user {
      img
    }
  }
}
`;
export const FETCH_POST_QUERY = gql`
query getPost($id: ID!){
  getPost(id: $id) {
    id
    body
    username
    createdAt
    likesCount
    likes {
      username
    }
    commentsCount
    comments {
      id
      username
      body
      createdAt
    }
    user {
      img
    }
  }
}
`;

export const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!){
  likePost(postId: $postId){
    id
    body
    username
    createdAt
    likesCount
    likes {
      username
    }
    commentsCount
    comments {
      username
      body
    }
  }
}
`;

export const DELETE_POST_MUTATION = gql`
mutation deletePost($id: ID!){
  deletePost(id: $id){
    id
  }
}
`;

export const CREATE_COMMENT_MUTATION = gql`
mutation createComment($body: String!, $postId: ID!){
  createComment(body: $body, postId: $postId){
    id
    body
    username
    createdAt
    likesCount
    likes {
      username
    }
    commentsCount
    comments {
      username
      body
    }
  }
}
`

export const DELETE_COMMENT_MUTATION = gql`
mutation deleteComment($commentId: ID!, $postId:ID!){
  deleteComment(commentId: $commentId, postId:$postId){
    id
    body
    username
    createdAt
    likesCount
    likes {
      username
    }
    commentsCount
    comments {
      username
      body
    }
  }
}
`
export const GET_USER_QUERY = gql`
  query getUser($username: String!){
    getUser(username:$username){
      id
      username
      createdAt
      email
      img
      follows
      followsCount
      followers
      followersCount
    }
  }
`;
export const FOLLOW_MUTATION = gql`
mutation follow($id: ID!) {
  follow(id: $id) {
    id
    username
    followers
  }
}
`;
export const GET_SUBSCRIBES_POSTS_QUERY = gql`
query getPosts($usernames: [String]) {
  getPosts(usernames: $usernames) {
    id
    body
    username
    createdAt
    likesCount
    likes {
      username
    }
    commentsCount
    comments {
      username
      body
    }
    user {
      img
    }
  }
}
`;