import { useState } from "react";
import Edit from "./Edit";
import axios, { URL } from "../constants/axios";
import { motion } from "framer-motion";

function Vehicle({ vehicle, ac, setAc }) {
  
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const VehicleDelete = (id) => {
    setLoading(true);
    axios({
      method: "delete",
      url: `${URL.vehicles}/${id}`,
      headers: { "Content-Type": "application/json" },
    });
    ac === false ? setAc(true) : setAc(false);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <motion.tr
        whileHover={{ scale: 1.02, opacity: 1 }}
        whileTap={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <td>{vehicle.brand}</td>
        <td>{vehicle.modelYear}</td>
        <td>{vehicle.model}</td>
        <td>{vehicle.plate}</td>
        <td>{vehicle.notes ? vehicle.notes : "-Not yok-"}</td>
        <td className="">
          <button
            onClick={handleShow}
            className="mr-2 w-[100px] bg-blue-300 p-1 font-semibold rounded-sm"
          >
            Edit
          </button>
          <button
            onClick={() => VehicleDelete(vehicle.id)}
            variant="danger"
            className="mr-2 w-[100px] bg-red-300 p-1 font-semibold rounded-sm"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </td>
        <Edit show={show} handleClose={handleClose} vehicle={vehicle} />
      </motion.tr>
    </>
  );
}

export default Vehicle;