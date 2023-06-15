import React, { useEffect, useState } from "react";
import axios from "axios";

const EditNumber = ({ openModal, setOpenModal, data, fetchData }) => {
  const [symbol, setSymbol] = useState(data?.symbol);
  const [description, setDescription] = useState(data?.description);
  const [file, setFile] = useState(data?.url);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const editData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("symbol", symbol);
    formData.append("description", description);
    formData.append("file", file);
    try {
      await axios.patch(
        `https://backend-sapajari-sllsn77ftq-et.a.run.app/number/${data.uuid}`,
        formData
      );
      fetchData();
      setSymbol("");
      setDescription("");
      setFile("");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`${
          openModal ? "flex" : "hidden"
        } fixed top-0 left-0 right-0 z-50 justify-center items-center  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center shadow">
              <form onSubmit={editData} className="my-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNumber;
