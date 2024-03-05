import React from "react";
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Top from './Top';
import Computer_image from './Computer_image';

const Front = () => {

  return (
    <>
      <Container className="frontcontainer" fluid>
        <Top />
        <Computer_image />
        
      </Container>

      <Container className="frontcontainer" fluid>
        <Outlet />
      </Container>
    </>
  );
};

export default Front; 