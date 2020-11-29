import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { FOLLOW_MUTATION, GET_SUBSCRIBES_POSTS_QUERY } from "../utils/graphql";
import { setActiveLink } from "./MenuBar";
import Preloader from "./Preloader";

const FollowButton = ({ isFollowed, id, query, variables }) => {
  const { user } = useContext(AuthContext);

  const [follow, { loading, errors }] = useMutation(FOLLOW_MUTATION, {
    variables: { id },
    update(proxy, { data: { follow: result } }) {
      const data = proxy.readQuery({
        query: query,
        variables,
      });
      const newFollowers = result.followers;
      proxy.writeQuery({
        query: query,
        variables,
        data: { getUser: { followers: newFollowers }, ...data.getUser },
      });

      const { getUser: me } = proxy.readQuery({
        query: query,
        variables: { username: user.username },
      });
      const newFollows =
        result.followers.indexOf(user.username) >= 0
          ? [...me.follows, result.username]
          : me.follows.filter((item) => item != result.username);
      proxy.writeQuery({
        query: query,
        variables: { username: user.username },
        data: { getUser: { follows: newFollows }, ...me },
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  const onFollow = () => {
    if (user) follow();
    else setActiveLink("login");
  };

  return (
    <Button onClick={onFollow} color="facebook" floated="right">
      {loading ? <Preloader size="mini" /> : isFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
