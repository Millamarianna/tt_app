import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import { Image } from 'react-bootstrap';
import useWindowSize from '../hooks/useWindowSize';

import { FaChevronDown } from "react-icons/fa6";

const Computer_image = () => {
    const size = useWindowSize();

    const images = [
        require('../assets/c1.png'),
        require('../assets/c2.png'),
        require('../assets/c3.png'),
        require('../assets/c4.png'),
        require('../assets/c5.png'),
        require('../assets/c6.png'),
        require('../assets/c7.png'),
        require('../assets/c8.png'),
        require('../assets/c9.png'),
        require('../assets/c10.png'),
        require('../assets/c11.png'),
        require('../assets/c12.png'),
        require('../assets/c13.png'),
        require('../assets/c14.png'),
        require('../assets/c15.png'),
        require('../assets/c16.png'),
        require('../assets/c17.png'),
    ];

    const aspectRatio = 1784 / 1020;
    const textBoxWidth = size.width - aspectRatio * 0.4 * size.height;

    const y = 0.9 * size.width;
    const x = 0.4 * size.height * aspectRatio;

    const twoTxt = size.height > 900 && size.width > 1600;

    const imageStyle = {
        position: 'absolute',
        bottom: '1%',
        left: '0%',
        height: y < x ? 'auto' : '40vh',
        width: y < x ? '90vw' : 'auto',
    };

    const textBox = y > x && aspectRatio * 0.4 * size.height <= 0.5 * size.width;

    const textStyle = {
        backgroundImage: 'radial-gradient(white 20%, transparent 80%)',

        width: `${textBoxWidth}` + 'px',
        paddingLeft: '10vw',
        fontSize: 'calc(16px + (23 - 16) * ((100vw - 300px) / (1600 - 300)))',
    };

    const [visible, setVisible] = useState(true)
 
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 0) {
            setVisible(false)
        }
        else if (scrolled <= 0) {
            setVisible(true)
        }
    };
 
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'auto'
            /* you can also use 'auto' behaviour 
               in place of 'smooth' */
        });
    };
 
    window.addEventListener('scroll', toggleVisible);

    return (
        <Container fluid className="imagecontainer">
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    className={`animate pop delay-${index + 1}`}
                    style={{ ...imageStyle, zIndex: index + 1 }}
                ></Image>
            ))}
            {twoTxt ? (
                <div style={textStyle}>
                    <p>Tarvitsetko verkkosivut itsellesi tai yrityksellesi? Loistaa Consulting tarjoaa vahvan osaaminen verkkosivusuunnittelun kokonaisuudesta:
                        teknisen toteutuksen, grafiikoiden suunnittelun ja kuvien muokkaamisen.
                        Lisäksi hyödynnetään psykologista osaamista web-suunnittelussa käyttäjäkokemuksen parantamiseksi,
                        värimaailman ja visuaalisen suunnittelun optimoimiseksi sekä tehokkaan kommunikaation ja konversioiden
                        edistämiseksi sisällössä.</p>

                    <p>Tarjolla on valmiita web-paketteja, joista voit valita omiin tarpeisiisi sopivan valmiin kokonaisuuden räätälöitäväksi sisältöösi sopivaksi.
                        Vaihtoehtoisesti voidaan suunnitella ideasi ympärille uniikki kokonaisuus tuntityönä tai urakkahinnalla.</p></div>) :
                textBox ? (
                    <div style={textStyle}>
                        <p>Tarvitsetko verkkosivut itsellesi tai yrityksellesi? Tarjolla on valmiita web-paketteja, joista voit valita omiin tarpeisiisi sopivan valmiin kokonaisuuden räätälöitäväksi sisältöösi sopivaksi.
                            Vaihtoehtoisesti voidaan suunnitella ideasi ympärille uniikki kokonaisuus tuntityönä tai urakkahinnalla.</p>
                    </div>
                ) : null}

            <div onClick={(e) => {e.preventDefault(); scrollToBottom();}} style={{ position: 'absolute', left: '45vw', bottom: '2%', zIndex: '100' }}>
                <FaChevronDown size={30} />
            </div>

        </Container>
    );
};

export default Computer_image;
