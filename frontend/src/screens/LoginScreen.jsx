import React, { useEffect, useState } from "react";
import FormContainer from "../component/FormContainer";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../component/Loader";
import { useLoginMutation } from "../slices/userApiSlice";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const search = useLocation().search;
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Loged in successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In </h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign in
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
