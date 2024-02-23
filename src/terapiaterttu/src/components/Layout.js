import React, { useEffect } from "react";
import { Image } from "react-bootstrap";

import { Outlet, Link } from "react-router-dom";

//Import css file, that will be in index.js in production!
import '../terttu-style.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { BiSolidLock } from "react-icons/bi";
import { BiSolidLockOpen } from "react-icons/bi";

//Import useAuth hook, Header and Footer components + Logo
import useAuth from "../hooks/useAuth";
import Header from './Header';
import Footer from "./Footer";
import logowithframe from '../assets/logowithframe.png';

const Layout = () => {
  //useAuth hook provides auth state and functions to update it
  const { isLoggedIn, setLoggedIn, auth, setAuth } = useAuth();

  //Check if user is logged in by checking the cookie
  useEffect(() => {
    // Check if the JWT token exists in the cookie
    const jwtCookie = document.cookie.split("; ").find((row) => row.startsWith("jwt="));
    if (jwtCookie && jwtCookie.split("=")[1] !== undefined && jwtCookie.split("=")[1] !== "") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isLoggedIn]);

  //Logout function
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
    //Layout with Header, Navbar, Outlet and Footer
    <Container className="t-layout-container" fluid>

      <Header />

      <Navbar collapseOnSelect expand="md" className="t-navigator">

        <Container className="t-navigator-container">

          <Navbar.Brand className="d-md-none" href="#"><Image src={logowithframe} className="t-logo-in-nav" fluid /> Terapiaterttu</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">   
            <Nav className="me-auto" style={{padding: '0.5vh'}}> 

    {/* Check correct link paths with router in App */}
              <Nav.Link as={Link} to="/terttu">Etusivu</Nav.Link>
              <Nav.Link as={Link} to="/terttu/page1">Tietosivu 1</Nav.Link>
              <Nav.Link as={Link} to="/terttu/page2">Tietosivu 2</Nav.Link>
            </Nav>

    {/* Admin paths, check with router in App */}
            {isLoggedIn && auth.role == "admin" ? (
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/terttu/customers">Asiakkaat</Nav.Link>
                <Nav.Link as={Link} to="/terttu/appointments">Ajanvaraukset</Nav.Link>
                <Nav.Link as={Link} to="/terttu/createappointments">Tee uusi ajanvaraus</Nav.Link>
              </Nav>
            ) : null}

    {/* Log-in paths, check with router in App */}
            <Nav className="ms-auto">
              {isLoggedIn && auth.first_name ? (
                <Navbar.Text>
                  Hei {auth.first_name}!
                </Navbar.Text>) : null}
              {isLoggedIn && auth.first_name ? (
                <NavDropdown align="end" title={<BiSolidLockOpen />} id="collapsible-nav-dropdown">
                  <NavDropdown.Item onClick={logout}>Kirjaudu ulos</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/user">Käyttäjätiedot</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/appt">Ajanvaraukset</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/createappt">Varaa uusi aika</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown align="end" title={<BiSolidLock />} id="collapsible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/login">Kirjaudu sisään</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">Rekisteröidy käyttäjäksi</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />

      <Footer />

    </Container>
  );
};

export default Layout;