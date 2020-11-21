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

