import { useState } from "react";
import "../style/MovieModal.css";
import { addMovie, updateMovie } from "../utils/Helper";

export const MovieModal = (props) => {
  const target = props.isModalOpen.target;
  const movie = props.isModalOpen.movie;
  const [title, setTitle] = useState(movie ? movie.title : "");
  const [year, setYear] = useState(movie ? movie.year : "");
  const [rating, setRating] = useState(movie ? movie.rating : "");
  const [description, setDescription] = useState(
    movie ? movie.description : ""
  );
  const [file, setFile] = useState(props.isModalOpen.image || null);
  const [genre, setGenre] = useState(movie ? movie.genre : []);

  let action = {};
  const modalType = props.isModalOpen.type;
  switch (modalType) {
    case "add":
      action = "Add Movie";
      break;
    case "update":
      action = "Update Movie";
      break;
    default:
      action = "Submit";
  }
  function handleCheck(e) {
    const { checked, value } = e.target;
    if (checked) {
      setGenre([...genre, value]);
    } else {
      setGenre(genre.filter((item) => item !== value));
    }
  }

  function closeModal() {
    props.setIsModalOpen({ state: false, type: modalType, target: target });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.setIsLoading(true);
    if (modalType === "add") {
      addMovie(title, year, rating, description, genre, file, props.fetchData);
      closeModal();
    } else if (modalType === "update") {
      updateMovie(
        target,
        title,
        year,
        rating,
        description,
        genre,
        file,
        props.fetchData
      );
      closeModal();
    }
  }

  return (
    <section id="modal-form">
      <form onSubmit={handleSubmit}>
        <h3>{action}</h3>
        <section className="input-container">
          <input
            className="input"
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </section>
        <section className="input-container">
          <input
            className="input"
            name="year"
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
        </section>
        <section className="input-container">
          <input
            className="input"
            name="rating"
            type="text"
            placeholder="Rating"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
        </section>

        <section className="input-container">
          <textarea
            className="input textarea"
            name="description"
            type="text"
            placeholder="Description"
            value={description}
            width="200"
            height="500px"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </section>
        <section id="genres-container">
          <section className="genre">
            <label htmlFor="action">
              Action{" "}
              <input
                type="checkbox"
                name="action"
                id="action"
                value="action"
                checked={genre.includes("action")}
                onChange={handleCheck}
              />
            </label>
          </section>
          <section className="genre">
            <label htmlFor="horror">
              Horror{" "}
              <input
                type="checkbox"
                name="horror"
                id="horror"
                value="horror"
                checked={genre.includes("horror")}
                onChange={handleCheck}
              />
            </label>
          </section>
          <section className="genre">
            <label htmlFor="crime">
              Crime{" "}
              <input
                type="checkbox"
                name="crime"
                id="crime"
                value="crime"
                checked={genre.includes("crime")}
                onChange={handleCheck}
              />
            </label>
          </section>
          <section className="genre">
            <label htmlFor="fantasy">
              Fantasy{" "}
              <input
                type="checkbox"
                name="fantasy"
                id="fantasy"
                value="fantasy"
                checked={genre.includes("fantasy")}
                onChange={handleCheck}
              />
            </label>
          </section>
          <section className="genre">
            <label htmlFor="sci-fi">
              Sci-Fi{" "}
              <input
                type="checkbox"
                name="sci-fi"
                id="sci-fi"
                value="sciFi"
                checked={genre.includes("sciFi")}
                onChange={handleCheck}
              />
            </label>
          </section>
          <section className="genre" onClick={handleCheck}>
            <label htmlFor="history">
              History{" "}
              <input
                type="checkbox"
                name="history"
                id="history"
                value="history"
                checked={genre.includes("history")}
                onChange={handleCheck}
              />
            </label>
          </section>
        </section>
        <section className="image-input-container">
          <input
            type="file"
            name="image"
            className="file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </section>
        <section className="btn-container">
          <button type="button" className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            {action}
          </button>
        </section>
      </form>
    </section>
  );
};
