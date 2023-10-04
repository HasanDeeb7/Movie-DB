import "../style/MovieCard.css";
import { arrayBufferToBase64, deleteMovie, displayBtn } from "../utils/Helper";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useState, useEffect } from "react";

export const Movie = (props) => {
  const { _id, title, year, rating, description, genre } = props.data;
  const [isBtnShown, setIsBtnShown] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (props.data.image) {
      const binaryImage = props.data.image.data.data;
      const base64String = arrayBufferToBase64(binaryImage);
      setImage(`data:image/jpeg;base64,${base64String}`);
    }
  }, [image]);

  function handleUpdate() {
    props.setIsModalOpen({ state: true, type: "update", target: _id, movie: props.data, image: image});
  }
  async function handleDelete() {
    props.setIsLoading(true)
    await deleteMovie(_id);
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
        <img
          src={
            image
              ? image
              : "https://entiretools.com/placeholder/400x600/c0c0c0/ffd700/movie/jpeg"
          }
          alt={title}
        ></img>
      </figure>
      <section id="details-container">
        <section id="header-container">
          <h1 className="title">{title}</h1>
          <p>{genre.sort().join(" | ")}</p>
        </section>
        <section className="details">
          <p className="year">{year}</p>
          <p className="rating gold">
            {rating} <span className="star">⭐</span>
          </p>
        </section>
        <article className="description">{description}</article>
      </section>
      <section className={`card-btn-container ${isBtnShown ? "" : ""}`}>
        <BiTrash className="delete-btn icon" onClick={handleDelete} />
        <BiEdit className="update-btn icon" onClick={handleUpdate} />
      </section>
    </section>
  );
};
