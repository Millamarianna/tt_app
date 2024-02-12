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
                    <Col md={2}> <Image src={logowithframe} fluid /> </Col>
                    <Col md={10} style={{ fontSize: '4vh', alignSelf: 'flex-end' }}>Terapiaterttu</Col>
                </Row>
            </Container>
        </>
    );
};

export default Header;