import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Button, Form, TransitionGroup } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { useForm } from "../utils/hooks";
import Preloader from "./Preloader";

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likesCount
      commentsCount
    }
  }
`;

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(addPost, { body: "" });

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      values.body = "";
    },
    onError(err){
      console.log(err);
    },
    variables: values,
    // context: { headers: { Authorization: 'Bearer '+localStorage.getItem('jwtToken')}}
  });

  function addPost() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post: </h2>
        <Form.Field>
          <Form.Input
            placeholder="type post's body..."
            name="body"
            onChange={onChange}
            value={values.body}
            error={error}
          />
        </Form.Field>
        {loading ? <Preloader /> : <Button color='teal'>Post</Button>}
      </Form>
      { error && (
        <TransitionGroup>
        <div className="ui error message" style={{marginBottom: 20}}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div> 
        </TransitionGroup>
      )}
    </>
  );
};

export default PostForm;
