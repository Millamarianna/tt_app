import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
import React from 'react';
import kuva from '../assets/therapist_terttu.png';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';
import { LiaLaptopCodeSolid } from "react-icons/lia";


const WebDesign = () => {

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <>
      <Container fluid className="description-container animate slide delay-3" style={{ color: '#000000', fontSize: '3vw'}}>
          <Row style={{ paddingTop: '0.5vh' }}>
            <Col className="animate blur delay-2"><Image src={kuva} roundedCircle thumbnail  /></Col>
            <Col className="animate glow delay-2" ><p style={{ backgroundColor: '#FFE363'}}>Milla Tuomainen</p>
            <p style={{ backgroundColor: '#FFE363'}}>Koulutukseltani olen psykologi ja tietojenkäsittelyn tradenomi (suuntautumisena ohjelmointi ja digitaaliset palvelut)</p></Col>
          </Row>
          <Row className="animate glow delay-4" style={{ backgroundColor: '#FFE363'}}>
            <p>Minulla on vahva osaaminen verkkosivusuunnittelun kokonaisuudesta: 
              hallitsen teknisen toteutuksen, suunnittelen grafiikat ja muokkaan kuvat. 
              Lisäksi hyödynnän psykologista osaamistani web-suunnittelussa käyttäjäkokemuksen parantamiseksi, 
              värimaailman ja visuaalisen suunnittelun optimoimiseksi sekä tehokkaan kommunikaation ja konversioiden 
              edistämiseksi sisällössä.</p>
          </Row>
          <Row>
            <Stack direction="horizontal" gap={2}>
              <Button className="button-black animate pop delay-5">Portfolio</Button>
              <Button className="button-black animate pop delay-5">Hinnasto</Button>
      </Stack>
          </Row>

          <Row>
                    <Stack direction="horizontal" gap={2}>
                        <Button className='button animate pop delay-1' size="sm"
                            onClick={() => {setOpen(!open);}}
                            aria-controls="tutustu-tekijaan"
                            aria-expanded={open}>Tutustu tekijään</Button>
                        <Button className='button animate pop delay-1' size="sm"
                            onClick={() => {setOpen2(!open2);}}
                            aria-controls="pyyda-tarjous"
                            aria-expanded={open2}>Pyydä tarjous!</Button>
                    </Stack>
                </Row>
                <div style={{ minHeight: '150px' }}>
                    <Collapse in={open} dimension="width">
                        <div id="tutustu-tekijaan">

                            <Card body className="custom-card">
                            <LiaLaptopCodeSolid color="#FFE363" size="100" />
                                <p style={{ fontSize: '3.5vw'}}>Koulutukseltani olen psykologi ja tietojenkäsittelyn tradenomi (suuntautumisena ohjelmointi ja digitaaliset palvelut)</p>

                                <p style={{ fontSize: '3.5vw'}}>Minulla on vahva osaaminen verkkosivusuunnittelun kokonaisuudesta:
                                    hallitsen teknisen toteutuksen, suunnittelen grafiikat ja muokkaan kuvat.
                                    Lisäksi hyödynnän psykologista osaamistani web-suunnittelussa käyttäjäkokemuksen parantamiseksi,
                                    värimaailman ja visuaalisen suunnittelun optimoimiseksi sekä tehokkaan kommunikaation ja konversioiden
                                    edistämiseksi sisällössä.</p>
                            </Card>
                        </div>
                    </Collapse>
                    <Collapse in={open2} dimension="width">
                        <div id="pyyda-tarjous">

                            <Card body className="custom-card">
                            <LiaLaptopCodeSolid color="#FFE363" size="100" />
                                <p style={{ fontSize: '3.5vw'}}>Koulutukseltani olen psykologi ja tietojenkäsittelyn tradenomi (suuntautumisena ohjelmointi ja digitaaliset palvelut)</p>

                                <p style={{ fontSize: '3.5vw'}}></p>
                            </Card>
                        </div>
                    </Collapse>
                </div>
        </Container>
    </>
  )

}

export default WebDesign