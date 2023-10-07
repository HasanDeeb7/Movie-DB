import axios from "axios";

export async function addToWatchList(id) {
  try {
    await axios.post("http://localhost:5000/user/watchList/add", {
      userId: "652167202880a49651f7c50d",
      movieId: id,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function deleteFromWatchList(id) {
  console.log(id);
  try {
    await axios.delete("http://localhost:5000/user/watchList/delete", {
      data: {
        userId: "652167202880a49651f7c50d",
        movieId: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
export async function fetchWatchList() {
  console.log("userFetch");
  try {
    const response = await axios.get(
      "http://localhost:5000/user/watchList/read"
    );
    if (response.status === 200) {
      return response.data.data[0].watchList;
    }
  } catch (error) {
    console.error(error);
  }
}
