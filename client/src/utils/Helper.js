import axios from "axios";
export async function addMovie(title, year, rating,fetchData) {
    try {
      await axios.post(
        `http://localhost:5000/movies/add?title=${title}&year=${
          year || new Date().getFullYear()
        }&rating=${rating || 5}`
      );
      fetchData()
      console.log(title, year, rating)
    } catch (err) {
      console.log(err);
    }
  }
  export async function updateMovie(id, title, year, rating, fetchData) {
    try {
      await axios.patch(
        `http://localhost:5000/movies/update/${id}?title=${title}&year=${
          year
        }&rating=${rating}`
      );
      fetchData()
    } catch (error) {
      console.error(error);
    }
  }
  export async function deleteMovie(id){
    try{
      await axios.delete(`http://localhost:5000/movies/delete/${id}`)
    }catch(err){
      console.error(err);
    }
  }