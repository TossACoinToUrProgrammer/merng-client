import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Image, Label, Icon, Button, Popup } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeletePostButton from "./DeletePostButton";

const PostCard = ({
  post: {
    body,
    username,
    createdAt,
    id,
    likesCount,
    commentsCount,
    comments,
    likes,
  },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likesCount, likes }} />
        <Popup
          content="Comment on post"
          inverted
          trigger={
            <Button as="div" labelPosition="right">
              <Button basic color="blue" as={Link} to={`/posts/${id}`}>
                <Icon name="comments" />
              </Button>
              <Label as="a" basic color="blue" pointing="left">
                {commentsCount}
              </Label>
            </Button>
          }
        />

        {user && user.username === username && (
          <DeletePostButton post={{ id }} />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
