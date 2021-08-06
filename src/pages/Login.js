import React, { Fragment, useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { useAuthDispatch } from "../context/auth";

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

export default function Register(props) {
  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useAuthDispatch();

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      dispatch({ type: "LOGIN", payload: data.login });
      window.location.href = "/";
    },
  });

  const submitLoginForm = (e) => {
    e.preventDefault();

    loginUser({ variables });
  };
  function AlertDismissibleExample() {
    const [show, setShow] = useState(true);

    if (show) {
      return (
        <Alert variant="secondary" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Testing Credentials</Alert.Heading>
          <p>
            The following accounts can be used for testing, or you can register
            with any credentials for a new account;
          </p>
          <div className="d-flex">
            <div className="pr-4">
              <p>Username: john</p>
              <p>Password: 123456</p>
            </div>
            <div className="pr-4">
              <p>Username: jane</p>
              <p>Password: 123456</p>
            </div>
          </div>
        </Alert>
      );
    }
    return (
      <Button className="mb-2 mx-auto" onClick={() => setShow(true)}>
        Credentials
      </Button>
    );
  }

  return (
    <Fragment>
      <AlertDismissibleExample />
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Login</h1>
          <Form onSubmit={submitLoginForm}>
            <Form.Group>
              <Form.Label className={errors.username && "text-danger"}>
                {errors.username ?? "Username"}
              </Form.Label>
              <Form.Control
                type="text"
                value={variables.username}
                className={errors.username && "is-invalid"}
                onChange={(e) =>
                  setVariables({ ...variables, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={errors.password && "text-danger"}>
                {errors.password ?? "Password"}
              </Form.Label>
              <Form.Control
                type="password"
                value={variables.password}
                className={errors.password && "is-invalid"}
                onChange={(e) =>
                  setVariables({ ...variables, password: e.target.value })
                }
              />
            </Form.Group>
            <div className="text-center">
              <Button
                className=" mb-2"
                variant="success"
                type="submit"
                disabled={loading}
              >
                {loading ? "loading.." : "Login"}
              </Button>
              <br />
              <small>
                Don't have an account? <Link to="/register">Register</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
}
