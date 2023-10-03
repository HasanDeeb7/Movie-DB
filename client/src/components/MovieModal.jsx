import { useState } from "react";
import "../style/MovieModal.css";
import axios from "axios";
import { addMovie, updateMovie } from "../utils/Helper";

export const MovieModal = (props) => {
  const target = props.isModalOpen.target;
  const [title, setTitle] = useState(props.title || "");
  const [year, setYear] = useState(props.year || "");
  const [rating, setRating] = useState(props.rating || "");
  const [description, setDescription] = useState(props.description || "");

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

  function closeModal() {
    props.setIsModalOpen({ state: false, type: modalType, target: target });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.setIsLoading(true);
    if (modalType === "add") {
      addMovie(title, year, rating, description, props.fetchData);
      closeModal();
    } else if (modalType === "update") {
      updateMovie(target, title, year, rating, description, props.fetchData);
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
          <input
            className="input"
            name="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
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
