import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import Preloader from "../Preloader";
import css from "./SubscribesBar.module.css";

const GET_SUBS_QUERY = gql`
  query getSubs($usernames: [String]!) {
    getUsers(usernames: $usernames) {
      username
      img
    }
  }
`;

const SubscribesBar = ({ subsList = [] }) => {
  const { data: { getUsers: subs } = {}, loading } = useQuery(GET_SUBS_QUERY, {
    variables: { usernames: subsList },
  });

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        {loading ? (
          <Preloader />
        ) : (
          subs.map((item) => (
            <div key={item.username} className={css.item}>
              <img
                className={css.item__img}
                src={
                  item.img ||
                  "https://react.semantic-ui.com/images/avatar/large/molly.png"
                }
              />
              {item.username}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubscribesBar;
