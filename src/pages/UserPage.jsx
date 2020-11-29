import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import { Card, Grid, Icon, Image, Button, Popup } from "semantic-ui-react";

import Preloader from "../components/Preloader";
import { GET_USER_QUERY } from "../utils/graphql";
import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import FollowButton from "../components/FollowButton";
import { Redirect } from "react-router-dom";

const GET_POSTS_QUERY = gql`
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

const UserPage = (props) => {
  const { username } = props.match.params;

  const { loading, data: { getUser = {} } = {} } = useQuery(GET_USER_QUERY, {
    variables: { username },
  });

  const { loading: postsLoading, data: { getPosts: posts = [] } = {}, } = useQuery(GET_POSTS_QUERY, {
    variables: { usernames: [username] },
  });

  const {
    id,
    username: name,
    createdAt,
    img,
    email,
    followersCount,
    followers = [],
  } = getUser;

  const { user } = useContext(AuthContext);

  const isFollowed = user && followers.indexOf(user.username) >= 0;

  if (loading) return <Preloader size="massive" />;
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={5}>
          <Card fluid>
            <Card.Content>
              <Image
                floated="left"
                size="medium"
                style={{ maxHeight: "380px" }}
                src={
                  img
                    ? img
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGSvQBg4QKjp9lp1aKi7FXW-RRd--69r0Elg&usqp=CAUhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fm.facebook.com%2FOTAKUARCADE%2Fphotos%2F%3Fref%3Dpage_internal%26mt_nav%3D0&psig=AOvVaw2HNr4m0TfSNe7CGdbhr06P&ust=1606399140243000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOin26Xtne0CFQAAAAAdAAAAABAD"
                }
              />
              <Card.Header>{name}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{email}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Popup
                  trigger={
                    <Button primary>
                      <Icon name="user" />
                      {followersCount} Followers
                    </Button>
                  }
                >
                  <Popup.Header>
                    Followers
                  </Popup.Header>
                  <Popup.Content>
                    <ul style={{ listStyle: "none", display:'inline'}}>
                      {followers.map((item, i) => (
                        <li key={i}>
                          {item}
                          <hr />
                        </li>
                      ))}
                    </ul>
                  </Popup.Content>
                </Popup>

                {user && user.username !== username && (
                  <FollowButton
                    id={id}
                    isFollowed={isFollowed}
                    query={GET_USER_QUERY}
                    variables={{ username }}
                  />
                )}
              </div>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={11}>
          <Card fluid>
            <Card.Content>
              {user && user.username === username && (
                <Grid.Column style={{ marginBottom: "20px" }}>
                  <PostForm query={GET_POSTS_QUERY} variables={{ username }} />
                </Grid.Column>
              )}
              {postsLoading ? (
                <div style={{ margin: "auto" }}>
                  <Preloader />
                </div>
              ) : (
                posts.map((post) => {
                  return (
                    <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                      <PostCard
                        post={post}
                        deleteButtonProps={{
                          query: GET_POSTS_QUERY,
                          variables: { username },
                        }}
                      />
                    </Grid.Column>
                  );
                })
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UserPage;
