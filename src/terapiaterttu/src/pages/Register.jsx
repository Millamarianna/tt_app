import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

const Register = () => {
  let navigate = useNavigate();
  const [newUser, setNewUser] = useState({"first_name": "", "last_name": "", "email": "", "phone": "", "role": "user"});
  const [show, setShow] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const response = await fetch("https://damp-basin-12729-bd0230035c83.herokuapp.com/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Register: handleSubmit: result:" + JSON.stringify(result));
      setNewUser({"first_name": "", "last_name": "", "email": "", "phone": "", "role": "user"});
      setShow(true);
    } else {
      let errorResponse = await response.json();
      console.log("Register: handleSubmit: errorResponse:" + JSON.stringify(errorResponse));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleClose = () => setShow(false);

  const redirect = () => {
    navigate("/login", { replace: true });
  }

  

  return (
    <>
    <div>
      <h2 className="text-xl text-primary text-center font-bold my-2">
        Rekisteröidy
      </h2>

      <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Etunimi</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Etunimi"
            name="first_name"
            value={newUser.first_name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Sukunimi</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Sukunimi"
            name="last_name"
            value={newUser.last_name}
            onChange={handleInputChange}
          />
        </Form.Group>
        
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Sähköposti</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Sähköposti"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Puhelinnumero</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Puhelinnumero"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Salasana</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Salasana"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Button type="submit">Rekisteröidy käyttäjäksi</Button>
    </Form>
    </div>
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rekisteröityminen onnistui!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Olet nyt rekisteröitynyt käyttäjäksi. Voit kirjautua sisään!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={redirect}>
            Kirjautumissivulle
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default Register