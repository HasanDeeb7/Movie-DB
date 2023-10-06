import { Fragment, useEffect, useState } from "react";
import "../style/Home.css";

import axios from "axios";
import { Movie } from "./MovieCard";
import { MovieModal } from "./MovieModal";
import Header from "./Header";
import Loading from "./Loading";
import EditSort from "./EditSort";
import { Route, Routes } from "react-router-dom";
import User from "./User";

function Home() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({
    state: false,
    type: "add",
    taget: null,
  });
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({
    state: false,
    message: `Something's Wrong!`,
  });

  async function fetchData() {
    setIsLoading(true);
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
  useEffect(() => {
    fetchData();
  }, [sort]);


  return (
    isError.state ? isError.message :
    <>
  
      <div id="wrapper">
        <EditSort setIsModalOpen={setIsModalOpen} setSort={setSort}/>
        {isModalOpen.state && (
          <MovieModal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            setIsLoading={setIsLoading}
            fetchData={() => {
              fetchData();
            }}
          />
        )}
        <main>
          <section id="movies-container">
            {isLoading ? (
              <Loading />
            ) : (
              data.map((movie, idx) => (
                <Fragment key={idx}>
                  <Movie
                    data={movie}
                    setIsModalOpen={setIsModalOpen}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    fetchData={() => {
                      fetchData();
                    }}
                  />
                </Fragment>
              ))
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default Home;
