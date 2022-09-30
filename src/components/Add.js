import { useState } from "react";
import { Form } from "react-bootstrap";
import axios, { URL } from "../constants/axios";

const Add = ({ theModelId, ac, setAc }) => {
  const [modelYear, setModelYear] = useState("");
  const [plate, setPlate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const modelId = theModelId?.id;

  const addVehicle = { plate, modelId, modelYear, notes };
  console.log(addVehicle);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axios({
        method: "post",
        url: URL.vehicles,
        data: addVehicle,
        headers: {"Content-Type": "application/json"},
      });
      ac === false ? setAc(true) : setAc(false);
    } catch (error) {
      console.log(error.message);
    }
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="mt-3 w-full flex justify-center items-center flex-col">
      <Form className="w-1/3">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Model Year</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setModelYear(+e.target.value)}
            min="1930"
            max="2022"
            required
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Plate</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setPlate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="mt-2">
        <button
          className={`w-[150px] h-10 text-lg bg-indigo-400 font-semibold rounded-sm text-indigo-100 hover:bg-indigo-600 hover:text-white transition-colors 
          ${
            modelYear < 1930 || modelYear > 2022
              ? "bg-neutral-500 hover:bg-neutral-500 hover:text-indigo-100"
              : ""
          }`}
          onClick={() => handleSubmit()}
          type="submit"
          variant="primary"
          disabled={modelYear < 1930 || modelYear > 2022 ? true : false}
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </div>
    </div>
  );
};

export default Add;