import "../style/movieCard.css";
import Wick from "../assets/John Wick.jpg";
export const Movie = (props) => {
  const { title, year, rating, img } = props;
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
      <button className="update-btn">Update </button>
    </section>
  );
};
