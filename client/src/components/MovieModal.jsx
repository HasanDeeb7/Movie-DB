import { useState } from "react";
import "../style/MovieModal.css";
import axios from "axios";

export const MovieModal = (props) => {
  const [title, setTitle] = useState(props.title || "");
  const [year, setYear] = useState(props.year || '')
  const [rating, setRating] = useState(
    props.rating || ''
  );

  function closeModal(e) {
    e.preventDefault();
    props.setIsModalOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    addData(title, year, rating);
    props.fetchData()
  }
  async function addData(title, year, rating) {
    try {
      await axios.post(
        `http://localhost:5000/movies/add?title=${title}&year=${year || new Date().getFullYear()}&rating=${rating || 5}`
      );
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section id="modal-form">
      <form onSubmit={handleSubmit}>
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
        <section className="btn-container">
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="submit-btn" onClick={closeModal}>Add Movie</button>
        </section>
      </form>
    </section>
  );
};
