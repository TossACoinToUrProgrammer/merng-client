import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import { Grid } from "semantic-ui-react";

import Preloader from "../components/Preloader";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import { Redirect } from "react-router-dom";
import { GET_SUBSCRIBES_POSTS_QUERY, GET_USER_QUERY } from "../utils/graphql";
import SubscribesBar from "../components/SubscribesBar/SubscribesBar";

const Subscribes = () => {
  const { user } = useContext(AuthContext);
  const { data: { getUser = {} } = {} } = useQuery(GET_USER_QUERY, {
    variables: { username: user.username },
  });
  const {
    loading,
    data: { getPosts: posts = [] } = {},
  } = useQuery(GET_SUBSCRIBES_POSTS_QUERY, {
      variables: {usernames: getUser.follows},
  });

  if(!user) return <Redirect to="/login" />;
  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <div className='page-title'><h1>Subscribes</h1></div>
      </Grid.Row>
      <Grid.Row>
        <SubscribesBar subsList={getUser.follows} />
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <div style={{margin:"auto"}}><Preloader /></div>
        ) : (
          posts.map((post) => {
            return (
              <Grid.Column key={post.id} style={{marginBottom: "20px"}}>
                <PostCard post={post} />
              </Grid.Column>
            );
          })
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Subscribes;
