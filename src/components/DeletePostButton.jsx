import React from "react";
import { useMutation } from "@apollo/client";

import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from "../utils/graphql";
import DeleteButton from "./DeleteButton";

const DeletePostButton = ({ post: { id }, callback }) => {

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { id: id },
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
