import React, { useState } from "react";
import { ItemPhoneBookInterface } from "./App";
import "./bootstrap.min.css";

interface PopupPropsInterface {
  show: boolean;
  addItem: any;
}

const Popup = ({ show, addItem }: PopupPropsInterface) => {
  const [contact, setContact] = useState<ItemPhoneBookInterface>({
    id:"",
    name: "",
    numberphone: "",
  });
  const [showAddContact, setShowAddContact] = useState<boolean>(false);

  return (
    <div>
      {show && (
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Form</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="fw-bold">Name : </div>
                <input
                  value={contact.name}
                  onChange={(e) =>
                    setContact({ ...contact, name: e.target.value })
                  }
                  type="text"
                  name="name"
                ></input>
                <div className="fw-bold mt-3">Number : </div>
                <input
                  value={contact.numberphone}
                  onChange={(e) =>
                    setContact({ ...contact, numberphone: e.target.value })
                  }
                  type="text"
                ></input>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => addItem(contact)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
