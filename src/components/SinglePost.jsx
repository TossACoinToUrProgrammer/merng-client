import React, { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
  TransitionGroup,
} from "semantic-ui-react";
import moment from "moment";

import { CREATE_COMMENT_MUTATION, FETCH_POST_QUERY, FETCH_POSTS_QUERY } from "../utils/graphql";
import Preloader from "./Preloader";
import LikeButton from "./LikeButton";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import DeletePostButton from "./DeletePostButton";
import DeleteCommentButton from "./DeleteCommentButton";

const SinglePost = (props) => {
  const id = props.match.params.postId;

  const { user } = useContext(AuthContext);

  const { loading, data: { getPost: post = {} } = {} } = useQuery(
    FETCH_POST_QUERY,
    {
      variables: { id },
    }
  );

  const { onChange, onSubmit, values } = useForm(submitHandler, {
    commentBody: "",
  });

  const [createComment, { loading: isCommentLoading, error}] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: { body: values.commentBody, postId: id },
    onError(err) {
      console.log(err);
    },
  });

  if (!id) return <h3>Post id is not provided</h3>;

  if (!post.id && !loading) return <h3>Post not found</h3>;

  const {
    id: postId,
    username,
    createdAt,
    body,
    likesCount,
    likes,
    commentsCount,
    comments,
  } = post;

  const deletePostCallback = () => {
    props.history.push("/");
  };

  function submitHandler() {
    createComment();
  }

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                floated="right"
                size="small"
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton
                    user={user}
                    post={{ id: postId, likesCount, likes }}
                  />
                  <Button as="div" labelPosition="right">
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label as="a" basic color="blue" pointing="left">
                      {commentsCount}
                    </Label>
                  </Button>
                  <DeletePostButton
                    callback={deletePostCallback}
                    post={{ id: postId }}
                  />
                </Card.Content>
              </Card>
              <Form onSubmit={onSubmit}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={13}>
                      <Form.Input
                      error={error}
                        value={values.commentBody}
                        onChange={onChange}
                        name="commentBody"
                        placeholder="Type comment..."
                      />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button color="teal">{isCommentLoading ? <Preloader size='mini' /> : 'Comment'}</Button>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
              </Form>
              {error && 
                  <TransitionGroup>
                    <div
                      className="ui error message"
                      style={{ marginBottom: 20 }}
                    >
                      <ul className="list">
                        <li>
                          error
                        </li>
                      </ul>
                    </div>
                  </TransitionGroup>}
              {comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteCommentButton postId={id} commentId={comment.id} />
                    )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
};

export default SinglePost;
