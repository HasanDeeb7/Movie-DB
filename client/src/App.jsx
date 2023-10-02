import { useEffect, useState } from "react";
import dotenv from "dotenv";
import "./App.css";
import Logo from "./assets/Logo.svg";
import Poster from "./assets/John Wick.jpg";
import axios from "axios";
import { Movie } from "./components/MovieCard";
import { MovieModal } from "./components/MovieModal";

// dotenv.config();
const movies = [
  { title: "John Wick Chapter 4", year: 2017, rating: 8.8, img: Poster },
  { title: "Se7en", year: 1995, rating: 7.8, img: Poster },
  { title: "Shawshank Redemption", year: 1992, rating: 9.2, img: Poster },
  { title: "Green Land", year: 2019, rating: 6.8, img: Poster },
  { title: "Contratiempo", year: 2017, rating: 8.2, img: Poster },
  { title: "Venom", year: 2019, rating: 7.5, img: Poster },
];
function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    console.log('effect')
    fetchData();
  }, []);

  return (
    <div id="wrapper">
      {isModalOpen && <MovieModal setIsModalOpen={setIsModalOpen} data={data} setData={setData} fetchData={()=>{fetchData()}}/>}
      <header>
        <figure>
          <img src={Logo} alt="Logo" />
        </figure>
        <nav>
          <ul className="nav-links">
            <a href="#">Explore</a>
            <a href="#">Movies</a>
            <a href="#">Series</a>
            <a href='#' onClick={()=>setIsModalOpen(true)}>Add Movie</a>
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
                  key={idx}
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  img={movie.img}
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
