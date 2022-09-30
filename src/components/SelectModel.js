import axios, { URL } from "../constants/axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Add from "./Add";

function SelectModel({ show, handleClose, ac, setAc }) {
  const [models, setModels] = useState([]);
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [filteredModel, setFilteredModel] = useState([]);

  const getModels = async () => {

    try {

      return await axios({
        method: "get",
        url: URL.models,
        headers: {
          // Authorization: "Basic Y2loYW55eXVrc2VsQGdtYWlsLmNvbToxMjM0NQ==",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          setModels(response.data);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getModels();
  }, [model, brand]);

  const brandArray = models.map((model) => model.brand);

  const uniqueBrand = Array.from(new Set(brandArray));

  const alphabeticalSortedBrand =  uniqueBrand.sort((a, b) =>  a > b ? 1 : (a === b ? 0 : -1))

  // select options
  const options = alphabeticalSortedBrand.map((brand) => {
    return { value: brand, label: brand };
  });

  const handleSelect = (selecOption) => {
    setBrand(selecOption.value);
  };

  const getBrands = async brand => {
    try {
      return await axios({
        methos: "get",
        url: `${URL.modelsBrand}/${brand}`,
        headers: {
          // Authorization: "Basic Y2loYW55eXVrc2VsQGdtYWlsLmNvbToxMjM0NQ==",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          setFilteredModel(response.data);
          return response.data;
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBrands(brand);
  }, [brand]);

  console.log(filteredModel);

  const alphabeticalSortedModel =  filteredModel.sort((a, b) =>  a > b ? 1 : (a === b ? 0 : -1))

  const subOptions = alphabeticalSortedModel.map((m) => {
    return { value: m.model, label: m.model };
  });

  const subHandleSelect = (selecOption) => {
    // console.log(selecOption.value)
    setModel(selecOption.value);
  };

  const selectedModel = models.filter((m) => m.model === model);

  const [id] = selectedModel;

  console.log(selectedModel);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mb-5 w-full bg-indigo-100 flex flex-col items-center py-4 justify-center rounded-md">
      <div className="w-1/3 flex flex-col items-center justify-center">
        <div className="ml-1 self-start -mb-2 mt-2">Select Brand</div>
        <Select
          className="mt-3 w-full"
          options={options}
          onChange={handleSelect}
        />
        <div className="ml-1 self-start -mb-2 mt-2">Select Model</div>
        <Select
          className="mt-3 w-full"
          options={subOptions}
          onChange={subHandleSelect}
        />
      </div>
      <Add
        show={show}
        handleClose={handleClose}
        theModelId={id}
        ac={ac}
        setAc={setAc}
      />
    </motion.div>
  );
}

export default SelectModel;