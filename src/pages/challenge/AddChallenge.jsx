import React, { useState, useEffect } from "react";
import axios from "axios";

const AddChallenge = ({ fetchData, setAdd }) => {
  const [data, setData] = useState([]);
  const [teks, setTeks] = useState("");
  const [categoryChallengeId, setCategoryChallengeId] = useState(1);

  useEffect(() => {
    fetchDataCategoryChallenge();
  }, []);

  const fetchDataCategoryChallenge = async () => {
    try {
      const response = await axios.get(
        "https://backend-sapajari-sllsn77ftq-et.a.run.app/category-challenges"
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", teks);
    formData.append("categoryChallengeId", categoryChallengeId);
    try {
      await axios.post(
        "https://backend-sapajari-sllsn77ftq-et.a.run.app/challenge",
        formData
      );
      fetchData();
      setAdd(false);
      setTeks("");
      setCategoryChallengeId("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTeksChange = (e) => {
    setTeks(e.target.value);
  };

  return (
    <form onSubmit={sendData} className="my-6">
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="teks" className="label__input">
            Teks
          </label>
          <input
            type="text"
            id="teks"
            value={teks}
            onChange={handleTeksChange}
            className="input"
            placeholder="Enter text"
            required
          />
        </div>
        <div>
          <label htmlFor="category_select" className="label__input">
            Kategori Tantangan
          </label>
          <select
            name="category_select"
            id="category_select"
            className="input"
            value={categoryChallengeId}
            onChange={(e) => setCategoryChallengeId(e.target.value)}
          >
            {data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default AddChallenge;
