import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BiSolidLock } from "react-icons/bi";
import { BiSolidLockOpen } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import Header from './Header';
import Footer from "./Footer";

const Layout = () => {
  const { isLoggedIn, setLoggedIn, auth, setAuth } = useAuth();

  useEffect(() => {
    // Check if the JWT token exists in the cookie
    const jwtCookie = document.cookie.split("; ").find((row) => row.startsWith("jwt="));
    if (jwtCookie && jwtCookie.split("=")[1] !== undefined && jwtCookie.split("=")[1] !== "") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isLoggedIn]);

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
    <Container class="container-fluid" style={{ backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', marginTop: '5px', marginBottom: '5px' }}>
      <Header />
      <Navbar expand="lg" className="nav" style={{ background: 'linear-gradient(to bottom right, #ffffff 0%, #e6eff1 100%)', borderRadius: '25px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{padding: '0.5vh'}}> 
              <Nav.Link as={Link} to="/">Etusivu</Nav.Link>
              <Nav.Link as={Link} to="/page1">Tietosivu 1</Nav.Link>
              <Nav.Link as={Link} to="/page2">Tietosivu 2</Nav.Link>
            </Nav>
            {isLoggedIn && auth.role == "admin" ? (
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/customers">Asiakkaat</Nav.Link>
                <Nav.Link as={Link} to="/appointments">Ajanvaraukset</Nav.Link>
                <Nav.Link as={Link} to="/createappointments">Tee uusi ajanvaraus</Nav.Link>
              </Nav>
            ) : null}
            <Nav className="ms-auto">
              {isLoggedIn && auth.first_name ? (
                <Navbar.Text>
                  Hei {auth.first_name}!
                </Navbar.Text>) : null}
              {isLoggedIn && auth.first_name ? (
                <NavDropdown align="end" title={<BiSolidLockOpen />} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={logout}>Kirjaudu ulos</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/user">Käyttäjätiedot</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/appt">Ajanvaraukset</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/createappt">Varaa uusi aika</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown align="end" title={<BiSolidLock />} id="basic-nav-dropdown">
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