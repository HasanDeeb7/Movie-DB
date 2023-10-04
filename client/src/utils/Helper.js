import axios from "axios";

export async function addMovie(
  title,
  year,
  rating,
  description,
  genre,
  file,
  fetchData
) {
  try {
    await axios.post(
      `http://localhost:5000/movies/add`,
      {
        title: title,
        year: year,
        rating: rating,
        description: description,
        genre: genre,
        image: file,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    fetchData();
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
  genre,
  file,
  fetchData
) {
  try {
    await axios.patch(`http://localhost:5000/movies/update/${id}`, {
      title: title,
      year: year,
      rating: rating,
      description: description,
      genre: genre,
      image: file,
    },  { headers: { "Content-Type": "multipart/form-data" } });
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

export function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}