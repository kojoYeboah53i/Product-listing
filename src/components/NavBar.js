import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="primary" expand="lg">
          <Navbar.Brand href="/" style={{ color: "white" }}>
            Products
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/#" style={{ color: "white" }}>
                Home
              </Nav.Link>
              <Nav.Link href="/#shop" style={{ color: "white" }}>
                Shop
              </Nav.Link>
              <Nav.Link href="/#sidenav" style={{ color: "white" }}>
                Add
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
