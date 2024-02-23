import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logowithframe from '../assets/logowithframe.png';
import { Image } from "react-bootstrap";

const Header = () => {
    return (
        <>
            <Container style={{ marginBottom: '2vh' }}>
                
                <Row>
                    <Col className="d-none d-md-block" xs={3}> <Image src={logowithframe} fluid /> </Col>
                    <Col className="d-none d-md-block t-header" xs={9}>Terapiaterttu</Col>
                </Row>
            </Container>
        </>
    );
};

export default Header;