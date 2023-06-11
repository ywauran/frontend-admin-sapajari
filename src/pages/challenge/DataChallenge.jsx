import React, { useEffect, useState } from "react";
import axios from "axios";
import AddChallenge from "./AddChallenge";
import ModalCategoryChallenge from "../../components/modal/ModalDeleterCategoryChallenge";
import EditChallenge from "./EditChallenge";

const DatChallenge = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate the index of the last item on the current page
  const lastIndex = currentPage * itemsPerPage;

  // Calculate the index of the first item on the current page
  const firstIndex = lastIndex - itemsPerPage;

  // Get the current page's data
  const currentData = data.slice(firstIndex, lastIndex);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to previous page
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Go to next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/challenges");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/challenge/${selectedData.uuid}`
      );
      setData((prevData) =>
        prevData.filter((item) => item.uuid !== selectedData.uuid)
      );
      setOpenModalDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openModalDeleteData = (data) => {
    setSelectedData(data);
    setOpenModalDelete(true);
  };

  const openModalEditData = (data) => {
    setSelectedData(data);
    console.log(selectedData);
    setOpenModalEdit(true);
  };

  const openModalDetailData = (data) => {
    setSelectedData(data);
    console.log(selectedData);
    setOpenModalDetail(true);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-end">
          {openAdd ? (
            <>
              <button
                onClick={() => setOpenAdd(false)}
                className="button__primary"
              >
                Tutup
              </button>
            </>
          ) : (
            <button
              onClick={() => setOpenAdd(true)}
              className="button__primary"
            >
              Tambah Tantangan
            </button>
          )}
        </div>
        {openAdd ? (
          <AddChallenge fetchData={fetchData} setAdd={setOpenAdd} />
        ) : null}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Teks
                </th>
                <th scope="col" className="px-6 py-3">
                  Kategori Tantangan
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr
                  key={item.uuid}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1 + firstIndex}</td>
                  <td className="px-6 py-4">{item.text}</td>

                  <td className="px-6 py-4">
                    {item?.category_challenge?.title}
                  </td>
                  <td className="flex justify-center px-6 py-4 space-x-3">
                    <button
                      onClick={() => openModalEditData(item)}
                      className="w-24 text-center button__third"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openModalDeleteData(item)}
                      className="w-24 text-center button__warn"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center py-2 mt-4">
            <nav>
              <ul className="flex items-center space-x-4">
                <li className="page-item">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 border-2"
                  >
                    Previous
                  </button>
                </li>
                {Array.from(
                  { length: Math.ceil(data.length / itemsPerPage) },
                  (_, index) => (
                    <li key={index} className="page-item">
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`${
                          currentPage === index + 1 ? "active" : ""
                        } page-link`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
                <li className="page-item">
                  <button
                    onClick={goToNextPage}
                    disabled={
                      currentPage === Math.ceil(data.length / itemsPerPage)
                    }
                    className="p-2 border-2"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <ModalCategoryChallenge
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        deleteData={deleteData}
      />

      <EditChallenge
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        data={selectedData}
        fetchData={fetchData}
      />
    </>
  );
};

export default DatChallenge;
