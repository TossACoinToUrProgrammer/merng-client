import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { ErrorMessage } from "../components/ErrorMessage";
import Preloader from "../components/Preloader";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

const REGISTER_USER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
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

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    //on success mutation
    update(_, { data: { register: userData}}) {
      context.login(userData);
      props.history.push("/");
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

  function registerUser() {
    addUser();
  }

  const { username, email, password, confirmPassword } = values;

  return (
    <>
      <div className="page-title">
        <h1>Register</h1>
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
            label="Email"
            placeholder="email..."
            name="email"
            onChange={onChange}
            value={email}
            error={errors && errors.email}
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
          <Form.Input
            label="Confirm password"
            placeholder="confirm password..."
            type="password"
            name="confirmPassword"
            onChange={onChange}
            value={confirmPassword}
            error={errors && errors.confirmPassword}
          />
          {loading ? <Preloader /> : <Button primary>Submit</Button>}

          {errors && (
            <ErrorMessage error={errors} />
          )}
        </Form>
      </div>
    </>
  );
};

export default Register;
