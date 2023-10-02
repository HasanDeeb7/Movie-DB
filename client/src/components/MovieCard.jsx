import "../style/movieCard.css";
import Wick from "../assets/John Wick.jpg";
import { deleteMovie } from "../utils/Helper";
export const Movie = (props) => {
  const { title, year, rating } = props;
  function handleUpdate() {
    props.setIsModalOpen({ state: true, type: "update", target: props.id });
  }
  function handleDelete(){
    props.fetchData()
    deleteMovie(props.id)
  }
  return (
    <section className="movie">
      <figure>
        <img src={Wick} alt={title}></img>
      </figure>
      <section id="details-container">
        <p className="title">{title}</p>
        <p className="year">{year}</p>
        <p className="rating gold">
          {rating} <span className="star">⭐</span>
        </p>
      </section>
      <section className="btn-container">
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
        <button className="update-btn" onClick={() => handleUpdate()}>
          Update
        </button>
      </section>
    </section>
  );
};
