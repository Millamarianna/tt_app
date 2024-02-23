import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiSolidPencil } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";
import { set } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

const AdminCustomers = () => {
  const [fetchAgain, setFetchAgain] = useState(0);
  const [customersLoading, setCustomersLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [show_deletemodal, setShow_deletemodal] = useState(false);
  const [show_editmodal, setShow_editmodal] = useState(false);
  const [userToDelete, setUserToDelete] = useState("");
  const [userToUpdate, setUserToUpdate] = useState({});

  useEffect(() => {
    const fetchCustomers = () => {
      fetch("https://damp-basin-12729-bd0230035c83.herokuapp.com/users")
        .then((res) => res.json())
        .then((data) => {
          setCustomers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchCustomers();
  }, [fetchAgain])

  useEffect(() => {
    if (customers.length === 0) {
      setFetchAgain(fetchAgain + 1);
    }
    else {
      console.log(customers);
      setCustomersLoading(false);
    }
  }, [])

  const updateUser = async () => {
    console.log("new info " + JSON.stringify(userToUpdate));
    const id = userToUpdate.id;
    const data = { "first_name": userToUpdate.fname, "last_name": userToUpdate.lname, "email": userToUpdate.email, "phone": userToUpdate.phone };
    const response = await fetch(`https://damp-basin-12729-bd0230035c83.herokuapp.com/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("onnistui");
      setShow_editmodal(false);
      setFetchAgain(fetchAgain + 1);
    }
    else {
      // Handle errors
      console.log("Error:", response.statusText);
    }
  }

  const updateForm = (id, fname, lname, email, phone) => {
    console.log("updateUser " + id);
    setUserToUpdate({ "id": id, "fname": fname, "lname": lname, "email": email, "phone": phone });
    console.log(userToUpdate);
    setShow_editmodal(true)
  }

  const deleteAlert = (key) => {
    console.log("deleteUser " + key);
    setUserToDelete(key);
    setShow_deletemodal(true)
  }

  const deleteUser = async () => {
    console.log("deleteUser " + userToDelete);
    const response = await fetch(`https://damp-basin-12729-bd0230035c83.herokuapp.com/users/${userToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 204) {
      console.log("onnistui");
      setShow_deletemodal(false);
      setFetchAgain(fetchAgain + 1);
    }
    else if (response.ok) {
      const result = await response.json();
      console.log("Success:", result);
    }
    else {
      // Handle errors
      console.log("Error:", response.statusText);
    }
  }

  const handleClose_deletemodal = () => {
    setShow_deletemodal(false);
    setUserToDelete("");
  }

  const handleClose_editmodal = () => {
    setShow_editmodal(false);
    setUserToDelete("");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserToUpdate({
      ...userToUpdate,
      [name]: value,
    });
  };


  return (
    <div>
      <p></p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Etunimi</th>
            <th>Sukunimi</th>
            <th>Sähköpostiosoite</th>
            <th>Puhelinnumero</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map(function (data) {
            return (
              <tr key={data._id}>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td><Button variant="light" onClick={() => { updateForm(data._id, data.first_name, data.last_name, data.email, data.phone); }}>{<BiSolidPencil />}</Button>{' '}</td>
                <td><Button variant="light" onClick={() => { deleteAlert(data._id) }}>{<BiSolidTrash />}</Button>{' '}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Modal show={show_deletemodal} onHide={handleClose_deletemodal}>
        <Modal.Header closeButton>
          <Modal.Title>Haluatko varmasti poistaa asiakkaan tiedot?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vahvista asiakkaan kaikkien tietojen poisto "POISTA ASIAKAS" -painikkeesta. Muutoin klikkaa "PERUUTA".</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_deletemodal}>
            PERUUTA
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            POISTA ASIAKAS
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show_editmodal} onHide={handleClose_editmodal}>
        <Modal.Header closeButton>
          <Modal.Title>Päivitä asiakkaan tiedot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Etunimi</Form.Label>
              <Form.Control type="text" placeholder={userToUpdate.fname} name="fname" value={userToUpdate.fname} onChange={handleInputChange} />
              <Form.Label>Sukunimi</Form.Label>
              <Form.Control type="text" placeholder={userToUpdate.lname} name="lname"  value={userToUpdate.lname} onChange={handleInputChange} />
              <Form.Label>Sähköposti</Form.Label>
              <Form.Control type="email" placeholder={userToUpdate.email} name="email"  value={userToUpdate.email} onChange={handleInputChange} />
              <Form.Label>Puhelinnumero</Form.Label>
              <Form.Control type="number" placeholder={userToUpdate.phone} name="phone"  value={userToUpdate.phone} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_editmodal}>
            PERUUTA
          </Button>
          <Button variant="primary" onClick={updateUser}>
            PÄIVITÄ TIEDOT
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )

}

export default AdminCustomers