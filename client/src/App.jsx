import { useEffect, useState } from "react";
import dotenv from "dotenv";
import "./App.css";
import Logo from "./assets/Logo.svg";
import Poster from "./assets/John Wick.jpg";
import axios from "axios";
import { Movie } from "./components/MovieCard";
import { MovieModal } from "./components/MovieModal";

// dotenv.config();
function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({ state: false, type: "add", taget: null });
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      let response = await axios.get(`http://localhost:5000/movies/read`);
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
  }, []);

  return (
    <div id="wrapper">
      {isModalOpen.state && (
        <MovieModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          data={data}
          setData={setData}
          fetchData={() => {
            fetchData();
          }}
        />
      )}
      <header>
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
      </header>
      <main>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <section id="movies-container">
            {data.map((movie, idx) => {
              return (
                <Movie
                  key={movie._id}
                  id={movie._id}
                  idx={idx}
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  img={movie.img}
                  setIsModalOpen={setIsModalOpen}
                  fetchData={fetchData}
                />
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
