import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logowithframe from '../assets/logowithframe.png';
import { Image } from "react-bootstrap";

const Footer = () => {
    return (
        <>
            <Container style={{ marginBottom: '2vh', marginTop: '2vh ', borderTop: '1px solid #e6eff1', padding: '1vh' }}>

                <Row>
                    <Col className="logofont" md={6} style={{ alignSelf: 'flex-end' }}>© 2024 webdesign</Col>
                    <Col md={6} style={{ alignSelf: 'flex-end' }}>admin@sähköposti.fi</Col>
                </Row>
            </Container>
        </>
    );
};

export default Footer;