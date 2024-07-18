import React from "react";
import logo from "../img/logo3.png";
import { Navbar, Nav, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Header() {
  return (
    <div>
      <header>
        <Navbar
          sticky="top"
          data-bs-theme="light"
          expand="lg"
          className="navbar navbar-expand-lg bg-light"
          collapseOnSelect
        >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src={logo} alt="ROOT" />
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>Cart
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login Root your life in
                    nature
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
      </header>
    </div>
  );
}
