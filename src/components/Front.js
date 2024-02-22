import React from "react";
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Top from './Top';
import Computer_image from './Computer_image';
import Footer from "./Footer";
import Packages from "../pages/Packages";
import useWindowSize from '../hooks/useWindowSize'

const Front = () => {

  const size = useWindowSize();

  return (
    <>
      <Container fluid>
        <Top />
        <Computer_image />
        
      </Container>

      <Container fluid>
        <Outlet />
      </Container>
    </>
  );
};

export default Front; 