import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";

const App = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/", { replace: true });
    } catch {
      setLoading(false);
      setError("wrong password/email");
    }
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Link to="/newuser"> create new account </Link>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default App;
