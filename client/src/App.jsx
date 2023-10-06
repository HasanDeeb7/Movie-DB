import { useEffect, useState } from "react";

import axios from "axios";

import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import WatchList from "./components/WatchList";


function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({
    state: false,
    type: "add",
    taget: null,
  });
  const [sort, setSort] = useState("");
  const [isError, setIsError] = useState({
    state: false,
    message: `Something's Wrong!`,
  });
  const [isLoading, setIsLoading] = useState(true);
  async function fetchData() {
    setIsLoading(true);
    try {
      let response = await axios.get(`http://localhost:5000/movies/read/${sort}`);
      if (response.status === 200) {
        setData(response.data.data);
        setIsLoading(false);
      } else {
        setErrorMessage(response.data);
      }
    } catch (error) {
      console.log(error);
      setIsError({ state: true, message: "Network Error!" });
    }
  }
  useEffect(() => {
    fetchData();
  }, [sort]);

  return isError.state ? (
    isError.message
  ) : (
    <>
      <Header
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        movies={data}
      />
      <Routes>
        <Route path="/" element={<Home data={data} sort={sort} setSort={setSort} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
        <Route path="/user" element={<WatchList data={data}/>} />
      </Routes>
    </>
  );
}

export default App;
