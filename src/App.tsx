import React, { useState, useContext } from "react";
import Popup from "./Popup";
import "./App.css";
import "./bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import { setTokenSourceMapRange } from "typescript";
import { resourceLimits } from "worker_threads";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import { v4 as uuid } from 'uuid';
import { RandomUUIDOptions } from "crypto";
import internal from "stream";

export interface ItemPhoneBookInterface {
  id: string;
  name: string;
  numberphone: string;
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
      id:"1",
      name: "Aldi Anugra",
      numberphone: "098763252722",
      image: "",
    },
    {
      id:"2",
      name: "Della Octa A",
      numberphone: "1253748492",
    },
    {
      id:"3",
      name: "Muhammad Sholeh",
      numberphone: "09021281823172",
    },
  ]);

  // const [showAddContact, setShowAddContact] = useState<boolean>(false);

  const [contact, setContact] = useState<ItemPhoneBookInterface>({
    id:"",
    name: "",
    numberphone: "",
  });

  const addItem = (item: ItemPhoneBookInterface) => {
    setContacts([...contacts, item]);
    setShow(false);
  };

  const [name, setName] = useState();

  const [foundUsers, setFoundUsers] = useState(contacts);
  
  const filter = (e:any) => {
    const keyword = e.target.value;
    if (keyword !== ''){
      const results = contacts.filter((user) =>{
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      console.log(results);
      setFoundUsers(results);
    }else{
      setFoundUsers(contacts);
    }
    
    setName(keyword);
  };


  const [contact2, updateContact] = useState<ItemPhoneBookInterface>({
    id:"",
    name: "",
    numberphone: "",
  });

  const updateItem = (item: ItemPhoneBookInterface) => {
    for (const obj of contacts) {
      if (obj.name === name){
        obj.name = name;
        break;
      }
    }
    console.log(item);
    setShow2(false);
  };

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
            <input value={name} onChange={filter} type="text" className="form-control" placeholder="Search Contact"></input>
        </div>
          
          <div className="contact rounded">
          {foundUsers && foundUsers.length > 0 ? (foundUsers.map((contact) => (
            //isi
            <div className="d-flex flex-row justify-content-between mb-4">
                <div className="col-md-6">
                  <div className="fw-bold"> {contact.name} </div>
                  <div> {contact.numberphone} </div>
                </div>
                  <div className="button-update-delete">
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
                          // defaultValue={contact.name}
                          onChange={(e) =>
                            setContact({ ...contact, name: e.target.value })
                          }
                          className="w-100"
                        ></input>
                        <div className="fw-bold mt-3">Number : </div>
                        <input
                          type="text"
                          name="number"
                          // defaultValue={contact.numberphone}
                          onChange={(e) =>
                            setContact({ ...contact, numberphone: e.target.value })
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
            //isi
          ))) : (
            <h1>No results found</h1>
          )}
          </div>  

          {/* <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button> */}
 
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
                setContact({ ...contact, numberphone: e.target.value })
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
        
        {/* <div className="contact rounded">
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
                  <span>
                  
                  </span>
                  
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
}

export default App;
