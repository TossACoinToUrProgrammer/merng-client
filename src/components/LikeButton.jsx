import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { LIKE_POST_MUTATION } from "../utils/graphql";
import Preloader from "./Preloader";

const LikeButton = ({ user, post: { id, likesCount, likes } }) => {
  let postIsLiked;
  if (user)
    postIsLiked =
      likes && likes.find((item) => user && item.username === user.username);

  const [likePost, { loading }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
  });

  const likePostHandler = () => {
    likePost();
  };

  return (
    <Popup
    inverted
      content={postIsLiked ? 'Unlike post' : 'Like post'}
      trigger={
        <Button as="div" labelPosition="right">
          <Button basic={!postIsLiked} color="teal" onClick={likePostHandler}>
            {loading ? <Preloader size="mini" /> : <Icon name="heart" />}
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {likesCount}
          </Label>
        </Button>
      }
    />
  );
};

export default LikeButton;
