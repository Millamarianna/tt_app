import React from "react";

import { Outlet, Link } from "react-router-dom";

import '../terttu-style.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Base = () => {
    return (
        <>
            <Container className="base-container">

            <Outlet />
            </Container>
        </>
    );
};

export default Base;