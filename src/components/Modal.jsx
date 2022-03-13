import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ArtDisplayModal({ art }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="button-black" onClick={handleShow}>
        More info
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{art.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://www.artic.edu/iiif/2/${art.imageId}/full/843,/0/default.jpg`}
            className="height-500"
          />
          <h6 className="text-blue">
            {art.artist}
            <br />
            {art.date}
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ArtDisplayModal;
