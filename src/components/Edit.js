import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios, { URL } from "../constants/axios";

const Edit = ({ vehicle, show, handleClose }) => {
  
  const [year, setYear] = useState(vehicle.modelYear);
  const [plate, setPlate] = useState(vehicle.plate);
  const [notes, setNotes] = useState(vehicle.notes);

  const { id } = vehicle;

  const updatedVehicle = { year, plate, notes };

  const handleSubmit = async (id) => {
    await axios({
      method: "put",
      url: `${URL.vehicles}/${id}`,
      headers: { "Content-type": "applicatin/json" },
      data: updatedVehicle,
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Model Year</Form.Label>
              <Form.Control
                type="number"
                value={year}
                name="modelYear"
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Plate</Form.Label>
              <Form.Control
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={() => handleSubmit(id)}
            type="submit"
            variant="primary"
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;