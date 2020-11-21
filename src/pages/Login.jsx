import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { ErrorMessage } from "../components/ErrorMessage";
import Preloader from "../components/Preloader";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

const LOGIN_USER_MUTATION = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      loginInput: {
        username: $username
        password: $password
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState();

  const { onChange, onSubmit, values } = useForm(loginUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signIn, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    //on success mutation
    update(_, {data: { login: userData }}) {
      context.login(userData)
      props.history.push('/');
    },
    onError(err) {
      setErrors(
        err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : err
      );
    },
    variables: values,
  });

  function loginUser() {
    signIn();
  }

  const { username, password } = values;

  return (
    <>
      <div className="page-title">
        <h1>Login</h1>
      </div>

      <div className="form-container">
        <Form error onSubmit={onSubmit} noValidate>
          <Form.Input
            label="Username"
            placeholder="username..."
            name="username"
            onChange={onChange}
            value={username}
            error={errors && errors.username}
          />
          <Form.Input
            label="Password"
            placeholder="password..."
            name="password"
            type="password"
            onChange={onChange}
            value={password}
            error={errors && errors.password}
          />
          {loading ? <Preloader /> : <Button primary>Sign In</Button>}

          {errors && (
            <ErrorMessage error={errors} />
          )}
        </Form>
      </div>
    </>
  );
};

export default Login;
