import axios, {URL} from "../constants/axios"; 
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import SelectModel from "./SelectModel";
import Vehicle from "./Vehicle";

function Home() {
  
  const [vehicles, setVehicles] = useState([]);
  const [ac, setAc] = useState(false);

  const getVehicles = async () => {

    try {
      return await axios({
        method: "get",
        url: URL.vehicles,
        headers: {"Content-Type": "application/json"}
      })
        .then((response) => {
          if (response.status === 200) {
            setVehicles(response.data)
          } 
        });
      } catch (error) {
        console.log(error.message);
    }
  };

  useEffect(() => {
    getVehicles();
  }, [ac])
  
  return (
    <div className="px-6 py-3">
      <h2 className="bg-indigo-400 p-3 text-center text-white">Vehicle Edit Page</h2>
      <SelectModel ac={ac} setAc={setAc} />
      <Table striped size="sm">
        <thead>
          {
            ["Brand", "Year", "Model", "Plate", "Notes", "Aciton"].map((item, index) => (
              <th key={index}>{item}</th>
            ))
          }
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <Vehicle vehicle={vehicle} key={vehicle.id} ac={ac} setAc={setAc} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;