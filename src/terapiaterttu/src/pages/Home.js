import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Image } from "react-bootstrap";

import { PiArrowBendUpRightBold } from "react-icons/pi";

import useAuth from "../hooks/useAuth";
 
import homecta1 from '../assets/homecta1.png';
import homecta2 from '../assets/homecta2.png';
import homecta3 from '../assets/homecta3.png';


const Home = () => {

  const { isLoggedIn, setLoggedIn, auth, setAuth } = useAuth();
  const [texts, setTexts] = useState([]);
  const [textToEdit, setTextToEdit] = useState({
    "_id": "",
    "page": "home",
    "header": "",
    "body": [""],
    "type": "",
    "date": "",
    "time": "",
    "duration": "",
    "show": ""
  });
  const [fetchAgain, setFetchAgain] = useState(0);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);


  useEffect(() => {
    const getTexts = async () => {
      const response = await fetch("https://fam-backend-base.azurewebsites.net/text/home", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let textData = await response.json();
        console.log("getTexts:" + JSON.stringify(textData));
        setTexts(textData);
        setLoading(false);
      }
      else {
        console.log("getTexts, response not ok");
      }
    };
    getTexts();
  }, [fetchAgain])

  const handleEditText = async () => {
    let id = textToEdit._id;
    const response = await fetch(`https://fam-backend-base.azurewebsites.net/text/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textToEdit),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("onnistui");
      setShow(false);
      setTextToEdit({ "_id": "", "page": "home", "header": "", "body": [""], "type": "", "date": "", "time": "", "duration": "", "show": "" });
      setFetchAgain(fetchAgain + 1);
    } else {
      let errorResponse = await response.json();
      console.log("ei onnistunut:" + errorResponse["detail"]);
    }
  };

  const edit = (e) => {
    console.log("edit" + e.target.id);
    let editable = texts.find(x => x._id === e.target.id);
    setTextToEdit(editable)
    setShow(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTextToEdit({ ...textToEdit, [name]: value });
  };

  const handleBodyInputChange = (e) => {
    const { name, value } = e.target;
    setTextToEdit({ ...textToEdit, body: [...textToEdit.body.slice(0, name), value, ...textToEdit.body.slice(parseInt(name) + 1)] });

  };

  const add = () => {
    console.log("add");
    setTextToEdit({ ...textToEdit, body: [...textToEdit.body, ""] });
  }

  const del = (e) => {
    console.log("del" + e.target.id);
    let newBody = textToEdit.body.filter((item, index) => index != e.target.id);
    setTextToEdit({ ...textToEdit, body: newBody });
  }

  const handleClose = () => setShow(false);

  return (
    <>
      {loading ? (<div  className="logofont">hetki...</div>) :
        (<Container fluid className="t-home-container" style={{ marginTop: '3vh' }}>
          <Row style={{ paddingTop: '0.5vh' }}>
            <Col sm={4}>
              <Button className='t-button float-end button' size="lg">
              Toimintakehotus tähän!<br/> {<PiArrowBendUpRightBold />} <u>Tässä linkki</u> tarjoamiisi palveluihin!
              </Button>
            </Col>
            <Col sm={4} style={{alignSelf: 'flex-end' }}>
              <Image src={homecta2} fluid />
            </Col>
            <Col sm={4}>
            <Button className='t-button float-end button' size="lg">
            Tähän toinen toimintakehotus!<br/> {<PiArrowBendUpRightBold />} <u>Tässä linkki</u> ajanvaraukseen! 
              </Button>
            </Col>
          </Row>
          <Row style={{ paddingBottom: '0.5vh' }}>
            <Col sm={4}>
              <Image src={homecta1} fluid />
            </Col>
            <Col sm={4}>
            <Button className='t-button float-end button' size="lg">
            {<PiArrowBendUpRightBold />} <u>Kolmas toimintakehotus</u> yhteydenottoon!
            
              </Button>
            </Col>
            <Col sm={4}>
              <Image src={homecta3} fluid />
            </Col>
          </Row>
        </Container>)}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Muokkaa tekstiä</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Otsikko</Form.Label>
              <Form.Control type="text" placeholder={textToEdit.header} name="header" value={textToEdit.header} onChange={handleInputChange} />
            </Form.Group>

            {textToEdit.body.map((data, index) => {
              return (
                <Form.Group className="mb-3" id={index.toString()}>
                  <Form.Label>Tekstikappale {index + 1}</Form.Label><Button variant="secondary" id={index} onClick={(e) => del(e)}>Poista</Button>
                  <Form.Control type="text" placeholder={textToEdit.body[index]} name={index} value={textToEdit.body[index]} onChange={handleBodyInputChange} />
                </Form.Group>
              )
            })}
            <Button variant="secondary" onClick={add}>Lisää tekstikappale</Button>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            PERUUTA
          </Button>
          <Button variant="primary" onClick={handleEditText}>
            PÄIVITÄ TIEDOT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default Home