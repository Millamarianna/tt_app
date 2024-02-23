import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useWindowSize from '../hooks/useWindowSize';
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Toast from 'react-bootstrap/Toast';

const Top = () => {
    const size = useWindowSize();
    console.log("leveys: " + size.width +", korkeus: " + size.height)
    const loistaa_aspectRatio = 812 / 151;
    const header_aspectRatio = 762 / 60;
    const typewriter_aspectRatio = 967 / 31;
    const [show, setShow] = useState(false);

    const loistaaStyle = {
        fontSize: 'calc(32px + (73 - 32) * ((100vw - 300px) / (1600 - 300)))',
    };

    const headerStyle = {
        fontSize: 'calc(16px + (28 - 16) * ((100vw - 300px) / (1600 - 300)))',
    };

    const typewriterStyle = {
        fontSize: 'calc(16px + (28 - 16) * ((100vw - 300px) / (1600 - 300)))',
    };

    const typewriterStyle_sm = {
        fontSize: '14px',
    };


    return (
        <>
            <Container fluid className="topcontainer">
                <div className="typewriter"
                    style={{ position: 'absolute', top: '2%', right: '2%', fontSize: 'calc(14px + (21 - 14) * ((100vw - 300px) / (1600 - 300)))', }}
                    onClick={async () => {
                        if ("clipboard" in navigator) {
                            await navigator.clipboard.writeText("web@loistaa.fi");
                        } else {
                            document.execCommand("copy", true, "web@loistaa.fi");
                        }
                        setShow(true);
                    }}>web@loistaa.fi {<IoCopyOutline />}</div>

                <div className="typewriter"
                    style={{ position: 'absolute', top: '5%', right: '2%', maxWidth: '50%', fontSize: 'calc(14px + (21 - 14) * ((100vw - 300px) / (1600 - 300)))', }}>
                    <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
                        
                            Kopioitu leikepöydälle!
                        
                    </Toast>
                </div>

                

                <Row className="text-center line-animation" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Col xs={12} className="blaketon" style={loistaaStyle}>
                        Loistaa Consulting
                    </Col>
                    <Col xs={12} className="typewriter" style={headerStyle}>
                        WEB-SUUNNITTELU
                    </Col>

                </Row>

                
                <Row className="typed-out-container text-center" style={{ marginTop: '2vh' }}>
                        <Col className="d-sm-none d-block typewriter" style={typewriterStyle_sm}>APUA IDEASTA JULKAISUUN. </Col>
                    </Row>
                        <Row className="typed-out-container text-center">
                            <Col className="d-sm-none d-block typed-out typewriter" style={typewriterStyle_sm}>JÄTÄ KOODAUS MINULLE.</Col>
                        </Row>
                    <Row className="typed-out-container text-center" style={{ marginTop: '2vh' }}>
                        <Col className="d-none d-sm-block typed-out typewriter" style={typewriterStyle}>APUA IDEASTA JULKAISUUN. JÄTÄ KOODAUS MINULLE.</Col>
                    </Row>

            </Container>
        </>
    );
};

export default Top;
