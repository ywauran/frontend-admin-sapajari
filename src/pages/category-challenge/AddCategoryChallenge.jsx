import React, { useState } from "react";
import axios from "axios";

const AddCategoryChallenge = ({ fetchData, setOpenAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    try {
      await axios.post(
        "https://backend-sapajari-sllsn77ftq-et.a.run.app/category-challenge",
        formData
      );
      fetchData();
      setOpenAdd(false);
      setTitle("");
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
              Judul
            </label>
            <input
              type="text"
              id="letter"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Makanan"
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
              placeholder="Jenis-jenis Makanan"
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

export default AddCategoryChallenge;
