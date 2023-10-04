import { useEffect, useState } from "react";
import "./App.css";
import Logo from "./assets/Logo.svg";
import axios from "axios";
import { Movie } from "./components/MovieCard";
import { MovieModal } from "./components/MovieModal";
import { Sort } from "./components/Sort";
import { Oval } from "react-loader-spinner";
import { Edit } from "./components/Edit";

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({
    state: false,
    type: "add",
    taget: null,
  });
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    try {
      let response = await axios.get(
        `http://localhost:5000/movies/read/${sort}`
      );
      if (response.status === 200) {
        setData(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [sort]);

  return (
    <div id="wrapper">
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
      <header>
        <div className="head-wrapper">
          <figure>
            <img src={Logo} alt="Logo" />
          </figure>
          <nav>
            <ul className="nav-links">
              <a href="#">Explore</a>
              <a href="#">Movies</a>
              <a href="#">Series</a>
              <a
                href="#"
                onClick={() => setIsModalOpen({ state: true, type: "add" })}
              >
                Add Movie
              </a>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section id="movies-container">
          <Sort setSort={setSort} />
          <Edit />
          {isLoading ? (
            <span className="loading-container">
              <Oval
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={2000}
                strokeWidthSecondary={2030}
                color="var(--highlight-clr)"
                secondaryColor="var(--secondary-clr)"
              />
            </span>
          ) : (
            data.map((movie, idx) => {
              return (
                <>
                  <Movie
                    key={idx}
                    data={movie}
                    setIsModalOpen={setIsModalOpen}
                    setIsLoading={setIsLoading}
                    fetchData={() => {
                      fetchData();
                    }}
                  />
                </>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
