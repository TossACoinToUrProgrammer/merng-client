import React from "react";
import { useMutation } from "@apollo/client";

import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from "../utils/graphql";
import DeleteButton from "./DeleteButton";

const DeletePostButton = ({ post: { id }, callback, query, variables }) => {

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { id: id },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: query || FETCH_POSTS_QUERY,
        variables
      });

      proxy.writeQuery({
        query: query || FETCH_POSTS_QUERY,
        variables,
        data: { getPosts: data.getPosts.filter(post => post.id != result.data.deletePost.id) }
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  const deletePostHandler = () => {
    deletePost();
    if(callback) callback();
  };

  return (
        <DeleteButton onSubmitHandler={deletePostHandler} />
  );
};

export default DeletePostButton;
