import React, { useState } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";

function ArtDisplayModal({ art }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imageUrl = !art.imageId
    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
    : `https://www.artic.edu/iiif/2/${art.imageId}/full/843,/0/default.jpg`;

  return (
    <>
      <button className="button-black" onClick={handleShow}>
        More info
      </button>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{art.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="center">
          <Container>
            <Row>
              <Col>
                <img src={imageUrl} className="max-500px margin-20 img-fluid" />
              </Col>
            </Row>
            <Row>
              <h5>{art.artist}</h5>
            </Row>
            <Row>
              <h6>{art.date}</h6>
            </Row>
            <Row>
              <h6>{art.medium}</h6>
            </Row>
            <Row>
              <h6>{art.dimensions}</h6>
            </Row>
          </Container>
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
