import "../style/MovieCard.css";
import { arrayBufferToBase64, deleteMovie } from "../utils/Helper";
import { BiEdit, BiTrash, BiPlus } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";
import { addToWatchList, deleteFromWatchList } from "../utils/watchlistHelper";
import { useState, useEffect } from "react";

export const Movie = (props) => {
  const { _id, title, year, rating, description, genre } = props.data;
  const { isInWatchList, triggerEffect, effect, fetchData, setIsLoading } =
    props;
  const [isBtnShown, setIsBtnShown] = useState(false);
  const [image, setImage] = useState(null);
  const [isAddedToWatchList, setIsAddedToWatchList] = useState(isInWatchList);

  useEffect(() => {
    if (props.data.image) {
      const binaryImage = props.data.image.data.data;
      const base64String = arrayBufferToBase64(binaryImage);
      setImage(`data:image/jpeg;base64,${base64String}`);
    }
  }, [image]);
  function handleUpdate() {
    props.setIsModalOpen({
      state: true,
      type: "update",
      target: _id,
      movie: props.data,
      image: image,
    });
  }
  async function handleDelete() {
    setIsLoading(true);
    await deleteMovie(_id);
    fetchData();
  }

  return (
    <section className="movie hover hidden">
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
        {isAddedToWatchList ? (
          <span
            className="remove-x"
            onClick={() => {
              deleteFromWatchList(_id);
              setIsAddedToWatchList(false);
              triggerEffect(!effect);
            }}
          >
            <HiXMark />
          </span>
        ) : (
          <span
            className="add-square"
            onClick={() => {
              addToWatchList(_id);
              setIsAddedToWatchList(true);
              triggerEffect(!effect);
            }}
          >
            <BiPlus />
          </span>
        )}

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
