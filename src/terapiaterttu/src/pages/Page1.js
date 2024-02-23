import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Image } from "react-bootstrap";
import homecta1 from '../assets/homecta1.png';
import homecta2 from '../assets/homecta2.png';
import homecta3 from '../assets/homecta3.png';
import { PiArrowBendUpRightBold } from "react-icons/pi";
import img_of_therapist from '../assets/therapist_terttu.png';

const Page1 = () => {
  
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
      const response = await fetch("https://damp-basin-12729-bd0230035c83.herokuapp.com/text/home", {
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
    const response = await fetch(`https://damp-basin-12729-bd0230035c83.herokuapp.com/text/${id}`, {
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
    let newBody = textToEdit.body.filter((item, index) => index !== e.target.id);
    setTextToEdit({ ...textToEdit, body: newBody });
  }

  const handleClose = () => setShow(false);

  return (
    <>
      {loading ? (<div className="logofont">hetki...</div>) :
        (
    <Container class="container-fluid" style={{ marginTop: '3vh' }}>
      <Row>
        <Col sm={8}>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Tietoa yksilöterapiasta</Accordion.Header>
              <Accordion.Body>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.</p>

              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Tietoa pariterapiasta</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion></Col>
        <Col sm={4}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img_of_therapist} />
            <Card.Body>
              <Card.Title>Terapeutti Terttu</Card.Title>
              <Card.Text>
                Tietoa terapeutista. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Card.Text>
              <Button className="t-btn">Varaa aika</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm>

        </Col>
         </Row>
    </Container>)}
    </>
  )

}

export default Page1