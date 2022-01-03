import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";

const NewUser = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { createNewUser } = useAuth();
  const emailRef = useRef();
  const passwordRef1 = useRef();
  const passwordRef2 = useRef();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");
    try {
      setLoading(true);
      await createNewUser(emailRef.current.value, password);
      navigate("/", { replace: true });
    } catch {
      setLoading(false);
      setError("reference creation failed");
    }
  };
  console.log(password);

  return (
    <main>
      <Container>
        <Form onSubmit={submitHandler}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={emailRef}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passwordRef1}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              ref={passwordRef2}
              onChange={(e) => {
                if (passwordRef1.current.value === passwordRef2.current.value) {
                  setError("");
                  setPassword(passwordRef2.current.value);
                  setLoading(false);
                } else {
                  setError("password does not match");
                }
              }}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button disabled={loading} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default NewUser;
