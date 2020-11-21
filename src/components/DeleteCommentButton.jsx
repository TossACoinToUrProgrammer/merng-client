import React from "react";
import { useMutation } from "@apollo/client";

import DeleteButton from "./DeleteButton";
import { DELETE_COMMENT_MUTATION } from "../utils/graphql";
import Preloader from "./Preloader";

const DeleteCommentButton = ({ commentId, postId, callback }) => {
  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { commentId, postId },
    onError(err) {
      console.log(err);
    },
  });

  const deleteCommentHandler = () => {
    deleteComment();
    if (callback) callback();
  };

  return (
    <>
      {loading && <Preloader />}
      <DeleteButton onSubmitHandler={deleteCommentHandler} />
    </>
  );
};

export default DeleteCommentButton;
