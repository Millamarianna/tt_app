import React, { useState, useEffect, useRef } from "react";

import emailjs, { send } from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha'

import { CiSquareQuestion } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import { Button, Col, Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import useWindowSize from '../hooks/useWindowSize';
import loistaa from '../assets/resp_loistaa.png';
import terttu from '../assets/resp_terttu.png';

const Packages = () => {

    const service_id = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const template_id = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const public_key = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const recaptcha = process.env.REACT_APP_RECAPTCHA;

    const size = useWindowSize();

    const aspectRatio = 5502.992 / 2076.9963;
    const y = 0.9 * size.width;
    const x = 0.4 * size.height * aspectRatio;

    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [showEmailSent, setShowEmailSent] = useState(false);
    const [showEmailNotSent, setShowEmailNotSent] = useState(false);
    const [formText, setFormText] = useState({});

    const [initialOrientation, setInitialOrientation] = useState(getInitialOrientation());
    const initialAspectRatio = window.innerWidth / window.innerHeight;

    const rc = useRef();
    const [token, setToken] = useState(null);

    const handleCaptchaResponseChange = (response) => {
        console.log(response);
        setToken(response); 
      };
    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: portrait)");

        const handleOrientationChange = (event) => {
            window.location.reload();
            console.log("Orientation changed");
        };

        const handleResize = () => {
            const currentAspectRatio = size.width / size.height;

            // Reload the page only if the aspect ratio changes significantly
            if (Math.abs(currentAspectRatio - aspectRatio) > 0.01) {
                window.location.reload();
                console.log("Aspect ratio changed");
            }
        };

        // Attach event listeners
        mediaQuery.addEventListener("change", handleOrientationChange);
        window.addEventListener("resize", handleResize);

        // Cleanup event listeners when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleOrientationChange);
            window.removeEventListener("resize", handleResize);
        };
    }, [size.width, size.height, aspectRatio]);


    // Helper function to get the initial orientation
    function getInitialOrientation() {
        return window.innerHeight < window.innerWidth ? 'landscape' : 'portrait';
    }

    const handleClose = () => {
        setShow(false);
    }

    const header = ["Sivut pienyrittäjälle", "One-Pager"];
    const description = ["Tarpeisiisi helposti räätälöitävät, brändiisi sopivat kotisivut, jotka houkuttelevat asiakkaita ja kasvattavat yrityksesi näkyvyyttä. Sivut soveltuvat erinomaisesti esimerkiksi terapeuteille, ravintoloille, kukkakaupoille, kauneushoitoloille, freelance-suunnittelijoille, valokuvaajille, käsityöläisille ja taiteilijoille, jotka haluavat vahvistaa brändiään ja laajentaa asiakaskuntaansa verkossa. Voit valita tarpeisiisi sopivan varustelutason ja laajentaa palvelua lisäominaisuuksilla, kuten ylläpitopalveluilla, sisällöntuotannolla tai käyttäjävarmennuksella.",
        "Responsiiviset kotisivut, jotka toimivat kaikilla laitteilla ja tarjoavat käyttäjälleen saumattoman kokemuksen. One-pager kertoo yrityksesi tarinan ytimekkäästi ja tiiviisti yhdellä sivulla - ei turhia klikkauksia, vain olennainen tieto. "
    ]


    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const tooSmall = (size.width / size.height > 2) || (initialOrientation === 'landscape' && size.width < 1000);
    const tooltipPlace = size.width < 450 ? "top" : "right";

    const imageStyle = {
        height: y < x ? 'auto' : '40vh',
        width: y < x ? '90vw' : 'auto',
    };

    const pStyle = {
        fontSize: 'calc(16px + (23 - 16) * ((100vw - 300px) / (1600 - 300)))',
        color: '#f1efeb',
    };
    const headerStyle = {
        textAlign: 'center',
        fontSize: 'calc(18px + (25 - 18) * ((100vw - 300px) / (1600 - 300)))',
        fontWeight: '700',
        color: '#f1efeb',
    };

    const formStyle = {
        textAlign: 'left',
        fontSize: '1em',
        fontWeight: '700',
        color: '#000000',
    };

    const open = () => {
        setShow(true);
    }

    const services = {
        "label": ["Sisällöntuotanto", "Graafinen suunnittelu", "Palvelintila", "Uusi domain", "Ylläpito", "Tietokanta", "Käyttäjävarmennus", "Käyttöliittymä tekstimuokkauksille"],
        "description": ["Ideastasi konkreettiseksi tekstiksi verkkosivuillesi.", "Visuaalinen ilme ja grafiikat verkkosivuillesi.", "Pilvessä sijaitseva tallennustila verkkosivuille.", "Sivustosi osoite, joka kirjoitetaan nettiselaimen osoitekenttään.", "Tarvittavat päivitykset esimerkiksi kuukausimaksulla tai päivityskohtaisella kustannuksilla.", "Mahdollisuus tallentaa pysyvästi tietoja, esimerkiksi lomaketietoja.", "Mahdollisuus rekisteröityä käyttäjäksi ja kirjautua sisään päästäkseen käsiksi joihinkin sisältöihin.", "Mahdollisuus kirjautua muokkaamaan tekstejä helposti itse."]
    };

    const components = {
        "label": ["Navigaatio", "Kuvakaruselli", "Lomake", "Karttanäkymä", "Sosiaalisen median linkit", "Sosiaalisen median tai blogin feed", "Animaatiot", "Sivutus", "Pop-up ilmoitukset", "Uutiskirjeen tilaus"],
        "description": ["Jos sivusi ei ole One-Pager, tarvitaan navigaatio eri sivuille.", "Esittele kuvia painikkeista selattavassa tai itsestään vaihtuvassa kuvakarusellissa.", "Tietojen syöttäminen ja lähettäminen näppärästi (esim. yhteydenottolomake).", "Upotettu karttakuva, joka näyttää yrityksesi sijainnin ja johtaa klikkauksella Google Maps reittivalintaan.", "Upotetut ikonit, jotka vievät sosiaalisen median tileillesi.", "Viimeisimmät postaukset sosiaalisen median tililtäsi tai blogistasi upotettuna, vaatii Developer Accountin.", "Animaatiot tuovat elävyyttä ja ilmeikkyyttä sivuillesi.", "Esimerkiksi tuotelistan jakaminen useammalle sivulle, vaihda sivua numeropainikkeilla.", "Tärkeiden tiedotteiden tai tapahtumien näyttäminen sivun päälle aukeavassa ikkunassa.", "Mahdollisuus tilata uutiskirjeesi suoraan sivustoltasi."]
    };

    const saveTyped = (e) => {
        if (e.target.type === "checkbox") {
            setFormText({ ...formText, [e.target.name]: e.target.checked });
        } else {
            setFormText({ ...formText, [e.target.name]: e.target.value });

        }
        console.log(formText);
    }

    const sendEmail = (e) => {
        e.preventDefault();

        const data = {
            service_id: service_id,
            template_id: template_id,
            user_id: public_key,
            template_params: {
                'first_name': formText.first_name,
                'last_name': formText.last_name,
                'email': formText.email,
                'company': formText.company,
                'site_description': formText.site_description,
                'service0': formText.service0,
                'service1': formText.service1,
                'service2': formText.service2,
                'service3': formText.service3,
                'service4': formText.service4,
                'service5': formText.service5,
                'service6': formText.service6,
                'service7': formText.service7,
                'service_else': formText.service_else,
                'component0': formText.component0,
                'component1': formText.component1,
                'component2': formText.component2,
                'component3': formText.component3,
                'component4': formText.component4,
                'component5': formText.component5,
                'component6': formText.component6,
                'component7': formText.component7,
                'component8': formText.component8,
                'component9': formText.component9,
                'component_else': formText.component_else,
                'g-recaptcha-response': token
            }
        };
        console.log(token);

        const sendRequest = async () => {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setShow(false);
                setShowEmailSent(true);
                setFormText({});
            } else {
                console.log("Email not sent");
                setShowEmailNotSent(true);
            }
        }
        sendRequest();
    }

    return (
        <><Container fluid className="carouselcontainer">
            <div className="typewriter"
                style={{ position: 'absolute', zIndex: '100', bottom: '30%', left: '20%', maxWidth: '70%', fontSize: 'calc(16px + (21 - 16) * ((100vw - 300px) / (1600 - 300)))', }}>
                <Toast onClose={() => setShowEmailSent(false)} show={showEmailSent} delay={4000} autohide>
                    Kiitos tarjouspyynnöstäsi! Vastaamme mahdollisimman pian.
                </Toast>
            </div>
            <Row style={imageStyle}>
                <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} interval={null} fade={true} controls={true} touch={true}>
                    <Carousel.Item >
                        <Image src={terttu} style={imageStyle} text="First slide" />
                    </Carousel.Item>
                    <Carousel.Item >
                        <Image src={loistaa} style={imageStyle} text="Second slide" />
                    </Carousel.Item>
                </Carousel>
            </Row>
            <Row style={imageStyle}>
                <Col xs={12}>
                    <p style={headerStyle}>{header[index]}</p>
                </Col>
                <Col xs={12}>
                    {!tooSmall ? (<p style={pStyle}>{description[index]}</p>) : null}
                    <Col xs={12}>
                        <Button id="1" className='btn button' onClick={open} size="sm">Tutustu mahdollisuuksiin ja pyydä tarjous!</Button>
                    </Col>
                </Col>
            </Row>
        </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kotisivu-paketti</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={sendEmail}>
                        <Row id="names" className="mb-1 g-1">

                            <Form.Text style={formStyle} onClick={async () => {
                                if ("clipboard" in navigator) {
                                    await navigator.clipboard.writeText("web@loistaa.fi");
                                } else {
                                    document.execCommand("copy", true, "web@loistaa.fi");
                                }
                                setShowCopy(true);
                            }}>
                                Pyydä tarjousta sähköpostilla web@loistaa.fi <sup>{<IoCopyOutline size={10} />}</sup> tai täytä tarjouslomake:
                            </Form.Text>
                            <div className="typewriter"
                                style={{ zIndex: '100', position: 'absolute', top: '5%', right: '2%', maxWidth: '50%', fontSize: 'calc(14px + (21 - 14) * ((100vw - 300px) / (1600 - 300)))', }}>
                                <Toast onClose={() => setShowCopy(false)} show={showCopy} delay={2000} autohide>
                                    Kopioitu leikepöydälle!
                                </Toast>
                            </div>
                            <div className="typewriter"
                                style={{ position: 'absolute', zIndex: '100', bottom: '10%', left: '2%', maxWidth: '75%', fontSize: 'calc(14px + (21 - 14) * ((100vw - 300px) / (1600 - 300)))', }}>
                                <Toast onClose={() => setShowEmailNotSent(false)} show={showEmailNotSent} delay={6000} autohide>
                                    <p>Virhe lomakkeen lähetyksessä. Voit kopioida kentät ja lähettää ne meille sähköpostilla!</p>Pahoittelut vaivasta, korjaamme vian mahdollisimman pian!
                                </Toast>
                            </div>

                            <Form.Text muted>Yleiset tiedot</Form.Text>

                            <Form.Group as={Col}>
                                <FloatingLabel controlId="floatingFirstName" label="Etunimi" className="mb-0 g-0">
                                    <Form.Control autocomplete="on" aria-label="Etunimi" type="name" placeholder="Etunimi" name="first_name" value={formText.first_name} onChange={saveTyped} />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <FloatingLabel controlId="floatingLastName" label="Sukunimi" className="mb-0 g-0">
                                    <Form.Control autocomplete="on" aria-label="Sukunimi" type="name" placeholder="Sukunimi" name="last_name" value={formText.last_name} onChange={saveTyped} />
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-1 g-1">
                            <FloatingLabel controlId="floatingEmail" label="Sähköposti" className="mb-0 g-0">
                                <Form.Control autocomplete="on" aria-label="Sähköposti" type="email" placeholder="Sähköposti" name="email" value={formText.email} onChange={saveTyped} />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-1 g-1">
                            <FloatingLabel controlId="floatingCompany" label="Yrityksen nimi" className="mb-0 g-0">
                                <Form.Control autocomplete="on" aria-label="Yrityksen nimi" placeholder="Yrityksen nimi" name="company" value={formText.company} onChange={saveTyped} />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-1 g-1">
                            <FloatingLabel controlId="floatingSiteDescription" label="Kuvaus kotisivujen aiheesta/tarkoituksesta" className="mb-1 g-1">
                                <Form.Control aria-label="Kuvaus kotisivujen aiheesta/tarkoituksesta" as="textarea" rows={4} name="site_description" value={formText.site_description} onChange={saveTyped} placeholder="Kuvaus kotisivujen aiheesta/tarkoituksesta" />
                            </FloatingLabel>
                        </Form.Group>

                        <hr />

                        <Row className="mb-1 g-1">
                            <Form.Text muted>Tarvitsemasi palvelut</Form.Text>
                        </Row>

                        {services.label.map((label, index) => {
                            const description = services.description[index];

                            return (
                                <Row id={index} className="mb-0 g-0">
                                    <Form.Group as={Col}>
                                        <Form.Check
                                            type="checkbox"
                                            id={`s${index}`}
                                            label={label}
                                            name={`service${index}`}
                                            onChange={saveTyped}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <OverlayTrigger
                                            key={`info${index}`}
                                            placement={tooltipPlace}
                                            overlay={<Tooltip id={index}>{description}</Tooltip>}>
                                            <Form.Text muted>{<CiSquareQuestion size={22} />}</Form.Text>
                                        </OverlayTrigger>
                                    </Form.Group>
                                </Row>)
                        })}
                        <Form.Group className="mb-1 g-1">

                            <Form.Control aria-label="Muuta" as="textarea" rows={3} placeholder="Muuta" name="service_else" value={formText.service_else} onChange={saveTyped} />

                        </Form.Group>
                        <hr />
                        <Row className="mb-1 g-1">
                            <Form.Text muted>Tarvitsemasi komponentit</Form.Text>
                        </Row>

                        {components.label.map((label, index) => {
                            const description = components.description[index];

                            return (
                                <Row id={index} className="mb-0 g-0">
                                    <Form.Group as={Col}>
                                        <Form.Check
                                            type="checkbox"
                                            id={`c${index}`}
                                            label={label}
                                            name={`component${index}`}
                                            onChange={saveTyped}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <OverlayTrigger
                                            key={`info${index}`}
                                            placement={tooltipPlace}
                                            overlay={<Tooltip id={index}>{description}</Tooltip>}>
                                            <Form.Text muted>{<CiSquareQuestion size={22} />}</Form.Text>
                                        </OverlayTrigger>
                                    </Form.Group>
                                </Row>)
                        })}
                        <Form.Group className="mb-1 g-1">

                            <Form.Control aria-label="Muuta" as="textarea" rows={3} placeholder="Muuta" name="component_else" value={formText.component_else} onChange={saveTyped} />

                        </Form.Group>
                        <ReCAPTCHA ref={rc} onChange={handleCaptchaResponseChange} sitekey={recaptcha} />
                        <Button className="button" type="submit" >
                            LÄHETÄ
                        </Button>

                    </Form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </>
    );
};

export default Packages;
