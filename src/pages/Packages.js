import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import { Button, Col, Image } from 'react-bootstrap';
import useWindowSize from '../hooks/useWindowSize';
import package_image from '../assets/package.png';
import loistaa from '../assets/resp_loistaa.png';
import Carousel from 'react-bootstrap/Carousel';
import { PiArrowBendUpRightBold } from "react-icons/pi";
import Row from 'react-bootstrap/Row';

const Packages = () => {
    const size = useWindowSize();
    const aspectRatio = 5502.992 / 2076.9963;
    const y = 0.9 * size.width;
    const x = 0.4 * size.height * aspectRatio;
    const textBox = y < x;
    const [index, setIndex] = useState(0);

    const header = ["One-pager", "Sivut pienyrittäjälle", "Koulutuskouluttaja"];
    const description = ["Responsiiviset kotisivut, jotka toimivat kaikilla laitteilla ja tarjoavat käyttäjälleen saumattoman kokemuksen. One-pager kertoo yrityksesi tarinan ytimekkäästi ja tiiviisti yhdellä sivulla - ei turhia klikkauksia, vain olennainen tieto. ",
        "Sivut pienyrittäjälle on palvelu, joka tarjoaa pienyrittäjille sivut, jotka toimivat kaikilla laitteilla. Sisältää kaiken tarvittavan tiedon yrityksestäsi.", "Koulutuskouluttaja on koulutuspalvelu, joka tarjoaa koulutusta kaikenlaisiin ongelmiin."]

    const list = [["Responsiivisuus: Sivut mukautuvat kaikille laitteille tietokoneista älypuhelimiin",
        "Yksilöllinen ulkoasu: Suunnitellaan värit, fontit ja grafiikat juuri sinun yrityksesi brändiä heijastavaksi. Persoonallinen ulkoasu erottaa sinut kilpailijoista ja vahvistaa yrityskuvaasi.",
        "Sisällön muotoilu: Yksilöllinen sisältösi esitetään houkuttelevasti ja helposti luettavasti. Tehokas muotoilu kiinnittää huomion olennaiseen ja tekee vaikutuksen kävijöihin.",
        "Hakukoneoptimointi: Huolella suunnitelyu hakukoneoptimointi auttaa parantamaan sijoitustasi hakutuloksissa ja houkuttelee enemmän potentiaalisia asiakkaita."],
    ["- Sisältää kaiken tarvittavan tiedon\n- Responsiivinen\n- Käyttäjäystävällinen"],
    ["- Koulutusta kaikenlaisiin ongelmiin\n- Responsiivinen\n- Käyttäjäystävällinen"]];

    const listItems = (index) => {
        return list[index].map((list, index) =>
            <li key={index}>{list}</li>
        )
    };

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const imageStyle = {

        height: y < x ? 'auto' : '40vh',
        width: y < x ? '90vw' : 'auto',
    };

    const textStyle = {
        position: 'absolute',
        top: '5%',
        fontSize: 'calc(16px + (23 - 16) * ((100vw - 300px) / (1600 - 300)))',
        width: '95vw',
        color: '#f1efeb',
    };

    const pStyle = {
        fontSize: 'calc(16px + (23 - 16) * ((100vw - 300px) / (1600 - 300)))',
        color: '#f1efeb',
    };
    const headerStyle = {
        textAlign: 'center',
        fontSize: 'calc(18px + (25 - 16) * ((100vw - 300px) / (1600 - 300)))',
        fontWeight: '700',
        color: '#f1efeb',
    };

    return (
        <><Container fluid className="carouselcontainer">
            <Carousel activeIndex={index} onSelect={handleSelect} style={imageStyle} indicators={false} interval={null} fade={true} controls={true} touch={true}>
                <Carousel.Item>
                    <Image src={loistaa} style={imageStyle} text="First slide" />

                </Carousel.Item>
                <Carousel.Item>
                    <Image src={loistaa} style={imageStyle} text="Second slide" />

                </Carousel.Item>
                <Carousel.Item>
                    <Image src={loistaa} style={imageStyle} text="Third slide" />

                </Carousel.Item>
            </Carousel>
        </Container>
            <Container fluid className="description-container">
                <Row style={{ marginTop: '30px', width: '95vw', }}>
                    <Col xs={12} lg={6}>
                        <p style={headerStyle}>{header[index]}</p>
                    </Col>
                </Row>
                <Row style={{ width: '95vw', }}>
                    <Col xs={12} xxl={6}>
                        <p style={pStyle}>{description[index]}</p>
                        <Button className='btn button' size="sm" style={{ marginTop: '20px' }}>Pyydä tarjous!</Button>
                    </Col>
                    <Col className="d-none d-xxl-block" xxl={6}>
                        <p style={pStyle}><ul>{listItems(index)}</ul></p>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default Packages;
