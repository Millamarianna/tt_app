import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BiSolidLock } from "react-icons/bi";
import { BiSolidLockOpen } from "react-icons/bi";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { isLoggedIn, setLoggedIn, setAuth } = useAuth();

  useEffect(() => {
    // Check if the JWT token exists in the cookie
    const jwtCookie = document.cookie.split("; ").find((row) => row.startsWith("jwt="));
    if (jwtCookie && jwtCookie.split("=")[1] !== undefined && jwtCookie.split("=")[1] !== "") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isLoggedIn]); // Run the effect only once on component mount

  const logout = () => {
    // Perform logout actions
    console.log('Before deleting cookie:', document.cookie);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log('After setting cookie:', document.cookie);

    // Update login state to trigger re-render
    setLoggedIn(false);
    setAuth({});
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Terapiaterttu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Etusivu</Nav.Link>
              <Nav.Link as={Link} to="/customers">Asiakkaat</Nav.Link>
              {isLoggedIn ? (
                <NavDropdown title={<BiSolidLockOpen />} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={logout}>Kirjaudu ulos</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Käyttäjätiedot</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title={<BiSolidLock />} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/login">Kirjaudu sisään</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Rekisteröidy käyttäjäksi</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
