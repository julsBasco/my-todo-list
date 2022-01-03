import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";

const NavBar = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleClick = async () => {
    setLoading(false);
    try {
      setLoading(true);
      await logout;
      navigate("/login", { replace: true });
    } catch {
      console.log("there was an error");
    }
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Julian's To-do App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Navbar.Text>
                {currentUser.email}{" "}
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleClick}
                  disabled={loading}
                >
                  {!loading ? "logout" : "loading"}
                </Button>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
