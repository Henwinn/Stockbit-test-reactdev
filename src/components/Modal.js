import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../pages/Home";
import noImage from "../utils/no-image-available.png";
import "../styles/Card.css";
import { Link } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  const { Poster, Title, imdbID, Year } = props.movie || {};
 

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{Title}</Modal.Title>
      </Modal.Header>
      <Link to={`movies/${imdbID}`} className="text-link" key={imdbID}>
        <Modal.Body>
          <center>
            <div className="card">
              {Poster === "N/A" ? (
                <img src={noImage} alt={Title} />
              ) : (
                <img src={Poster} alt={Title} />
              )}
              <div className="info">
                <span className="title">{Title}</span>
                <span className="year">{Year}</span>
              </div>
            </div>
          </center>
        </Modal.Body>
      </Link>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
