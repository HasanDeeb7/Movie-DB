import "../style/movieCard.css";
import "../style/card-hover.css";
import Wick from "../assets/John Wick.jpg";
import { deleteMovie, displayBtn } from "../utils/Helper";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useState } from "react";

export const Movie = (props) => {
  const { title, year, rating, description } = props;
  const [isBtnShown, setIsBtnShown] = useState(false);

  function handleUpdate() {
    props.setIsModalOpen({ state: true, type: "update", target: props.id });
  }
  function handleDelete() {
    console.log("deleteFunction");
    deleteMovie(props.id);
    props.fetchData();
  }
  return (
    <section
      className="movie hover hidden"
      onMouseOver={() => {
        setIsBtnShown(true);
      }}
      onMouseLeave={() => {
        setIsBtnShown(false);
      }}
    >
      <figure>
        <img src={Wick} alt={title}></img>
      </figure>
      <section id="details-container">
        <h1 className="title">{title}</h1>
        <section className="details">
          <p className="year">{year}</p>
          <p className="rating gold">
            {rating} <span className="star">⭐</span>
          </p>
        </section>
        <article className="description">
          {description}
        </article>
      </section>
      <section className={`card-btn-container ${isBtnShown ? "" : ""}`}>
        <BiTrash className="delete-btn icon" onClick={handleDelete} />
        <BiEdit className="update-btn icon" onClick={() => handleUpdate()} />
      </section>
    </section>
  );
};
