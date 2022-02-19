import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import "./App.css";
import "./bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";

export interface ItemPhoneBookInterface {
  name: string;
  number: string;
  image?: string;
}

function App() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  const [contacts, setContacts] = useState<ItemPhoneBookInterface[]>([
    {
      name: "Aldi Anugra",
      number: "098763252722",
      image: "",
    },
    {
      name: "Della Octa A",
      number: "1253748492",
    },
    {
      name: "Muhammad Sholeh",
      number: "09021281823172",
    },
  ]);

  // const [showAddContact, setShowAddContact] = useState<boolean>(false);

  const [contact, setContact] = useState<ItemPhoneBookInterface>({
    name: "",
    number: "",
  });

  const addItem = (item: ItemPhoneBookInterface) => {
    setContacts([...contacts, item]);
  };

  const [contact2, updateContact] = useState<ItemPhoneBookInterface>({
    name: "",
    number: "",
  });

  const updateItem = (item: ItemPhoneBookInterface) => {};
  const removeItem = (item: ItemPhoneBookInterface) => {
    setContacts(
      contacts.filter((value, index) => {
        return value.name !== item.name;
      })
    );
  };

  return (
    <div className="mt-5 mb-5">
      <div className="p-5 container bg-dark rounded">
        <h1 className="text-white mb-4">PhoneBook App</h1>

        <div className="addcontact mb-4">
          <h2 className="text-white">Contact</h2>
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            type="button"
          >
            <span className="fw-bold" onClick={handleShow}>
              + Add Contact
            </span>
          </button>
        </div>

        <div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search Contact" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
          <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
        </div>
          {/* {/* <form className="form-inline my-2 my-lg-0 ">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form> */}
        </div> 
        
        <Modal show={show}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Add Contact Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="fw-bold">Name : </div>
            <input
              defaultValue={" "}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              type="text"
              name="name"
              className="w-100"
            ></input>
            <div className="fw-bold mt-3">Number : </div>
            <input
              defaultValue={" "}
              onChange={(e) =>
                setContact({ ...contact, number: e.target.value })
              }
              type="text"
              className="w-100"
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => addItem(contact)}>
              Simpan
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <Popup show={showAddContact} addItem={addItem} /> */}

        <div className="contact rounded">
          {contacts.map((contact) => {
            return (
              <div className="d-flex flex-row justify-content-between mb-4">
                <div className="col-md-6">
                  <div className="fw-bold"> {contact.name} </div>
                  <div> {contact.number} </div>
                </div>
                <div className="col-md-6 row justify-content-end">
                  <button
                    className="btn btn-success w-25 h-75 mr-3"
                    onClick={handleShow2}
                  >
                    Update
                  </button>
                  <Modal show={show2}>
                    <Modal.Header closeButton onClick={handleClose2}>
                      <Modal.Title>Update Contact Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="fw-bold">Name : </div>
                      <input
                        type="text"
                        name="name"
                        defaultValue={contact.name}
                        onChange={(e) =>
                          setContact({ ...contact, name: e.target.value })
                        }
                        className="w-100"
                      ></input>
                      <div className="fw-bold mt-3">Number : </div>
                      <input
                        type="text"
                        name="number"
                        defaultValue={contact.number}
                        onChange={(e) =>
                          setContact({ ...contact, number: e.target.value })
                        }
                        className="w-100"
                      ></input>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={() => updateItem(contact)}
                      >
                        Perbarui
                      </Button>
                      <Button variant="secondary" onClick={handleClose2}>
                        Tutup
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <button
                    className="btn btn-danger w-25 h-75 ml-5"
                    onClick={() => removeItem(contact)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
