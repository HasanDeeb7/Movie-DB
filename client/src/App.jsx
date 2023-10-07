import { useEffect, useState } from "react";

import axios from "axios";

import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import WatchList from "./components/WatchList";


function App() {
  const [data, setData] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [isFetched, setIsFetched] = useState(false)
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
  const [ effect, triggerEffect] = useState(false)

  async function fetchData() {
    try {
      let response = await axios.get(
        `http://localhost:5000/movies/read/${sort}`
      );
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
  async function fetchWatchList() {
    console.log("userFetch");
    try {
      const response = await axios.get(
        "http://localhost:5000/user/watchList/read"
      );
      if (response.status === 200) {
        setWatchList(response.data.user[0].watchList)
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
    fetchWatchList();
  }, [sort, effect]);

  return isFetched && 
  isError.state ? (
    isError.message
  ) : (
    <>
      <Header
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        movies={data}
        watchList={watchList}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={data}
              watchList={watchList}
              sort={sort}
              setSort={setSort}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              triggerEffect={triggerEffect}
              effect={effect}
              fetchData={fetchData}
            />
          }
        />
        <Route
          path="/user"
          element={<WatchList watchList={watchList} data={data} triggerEffect={triggerEffect} effect={effect} />}
        />
      </Routes>
    </>
  );
}

export default App;
