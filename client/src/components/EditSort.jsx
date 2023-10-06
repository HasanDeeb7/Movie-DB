import React from "react";
import "../style/edit-sort.css";
import {EditMode} from '../utils/Helper'
function EditSort(props) {
  const { setSort, setIsModalOpen } = props;

  function handleSort(e) {
    setSort(e.target.id);
  }
  const sortItems = document.querySelectorAll(".sort-item");
  sortItems.forEach((item) => {
    item.addEventListener("click", () => {
      sortItems.forEach((item) => item.classList.remove("selected"));
      item.classList.add("selected");
    });
  });

  return (
    <section id="edit-sort">
      <section className="sort-container">
        <span onClick={handleSort} id="by-title" className="sort-item">
          Title
        </span>
        <span onClick={handleSort} id="by-date" className="sort-item">
          Year
        </span>
        <span onClick={handleSort} id="by-rating" className="sort-item">
          Rating
        </span>
      </section>
      <section className="edit-add">

      <button className="edit" onClick={EditMode}>
        Edit Mode
      </button>
      <button
        className="edit"
        onClick={() => setIsModalOpen({ state: true, type: "add" })}
        >
        Add Movie
      </button>
        </section>
    </section>
  );
}

export default EditSort;
