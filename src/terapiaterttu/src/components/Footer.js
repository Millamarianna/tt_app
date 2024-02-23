import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
    return (
        <>
            <Container className="t-footer-container">

                <Row>
                    <Col className="logofont" xs={6} style={{ alignSelf: 'flex-end' }}>© 2024 Loistaa Consulting</Col>
                    <Col className="logofont" xs={6} style={{ alignSelf: 'flex-end' }}>admin@sähköposti.fi</Col>
                </Row>
            </Container>
        </>
    );
};

export default Footer;