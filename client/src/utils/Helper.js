import axios from "axios";
export async function addMovie(title, year, rating, description, fetchData) {
  try {
    await axios.post(`http://localhost:5000/movies/add`, {
      title: title,
      year: year,
      rating: rating,
      description: description,
    });
    fetchData();
    console.log(title, year, rating);
  } catch (err) {
    console.log(err);
  }
}
export async function updateMovie(
  id,
  title,
  year,
  rating,
  description,
  fetchData
) {
  try {
    await axios.patch(`http://localhost:5000/movies/update/${id}`, {
      title: title,
      year: year,
      rating: rating,
      description: description,
    });
    fetchData();
  } catch (error) {
    console.error(error);
  }
}
export async function deleteMovie(id) {
  try {
    await axios.delete(`http://localhost:5000/movies/delete/${id}`);
  } catch (err) {
    console.error(err);
  }
}

export function displayBtn() {
  const btns = document.querySelector(".card-btn-container");
  btns.style.display = "flex";
}
