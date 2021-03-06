import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";

class App extends Component {
render() {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Kudos</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/admin">
              <NavItem>Admin</NavItem>
            </LinkContainer>
            <LinkContainer to="/employee">
              <NavItem>Employee</NavItem>
            </LinkContainer>
						<LinkContainer to="/register">
							<NavItem>Register</NavItem>
						</LinkContainer>
						<LinkContainer to="/login">
							<NavItem href="/login">Login</NavItem>
						</LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}
}

export default App;
