import React, { useState } from "react";
import axios from "axios";

const AddNumber = ({ fetchData, setAddNumber }) => {
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("symbol", symbol);
    formData.append("description", description);
    formData.append("file", file);
    try {
      await axios.post("http://localhost:8000/number", formData);
      fetchData();
      setAddNumber(false);
      setSymbol("");
      setDescription("");
      setFile("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={sendData} className="my-6">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="first_name" className="label__input">
              Simbol
            </label>
            <input
              type="number"
              id="number"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="input"
              placeholder="1"
              required
            />
          </div>
          <div>
            <label for="first_name" className="label__input">
              Deskripsi
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              placeholder="Angka 1"
              required
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="fileSubmission" className="label__input">
            File
          </label>
          <input
            type="file"
            className="input"
            id="fileSubmission"
            onChange={loadImage}
          />
        </div>

        <button
          type="submit"
          className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddNumber;
