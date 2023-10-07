import { Fragment, useEffect, useState } from "react";
import "../style/Home.css";

import { Movie } from "./MovieCard";
import { MovieModal } from "./MovieModal";
import Loading from "./Loading";
import EditSort from "./EditSort";

function Home(props) {
  const {
    data,
    sort,
    setSort,
    isLoading,
    setIsLoading,
    triggerEffect,
    effect,
    fetchData,
    watchList = null,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState({
    state: false,
    type: "add",
    taget: null,
  });

  const [isError, setIsError] = useState({
    state: false,
    message: `Something's Wrong!`,
  });

  return isError.state ? (
    isError.message
  ) : (
    <>
      <div id="wrapper">
        <EditSort setIsModalOpen={setIsModalOpen} setSort={setSort} />
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
                    isInWatchList={
                      watchList ? watchList.includes(movie._id) : false
                    }
                    fetchData={fetchData}
                    triggerEffect={triggerEffect}
                    effect={effect}
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
