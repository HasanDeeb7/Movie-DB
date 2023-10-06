import React, { useEffect, useState } from "react";
import "../style/user.css";
import axios from "axios";
import { Movie } from "./MovieCard";

function WatchList(props) {
  const { data } = props;
  console.log(data);
  const [watchList, setWatchList] = useState([]);
  async function fetchWatchList() {
    console.log("userFetch");
    try {
      const response = await axios.get(
        "http://localhost:5000/user/watchList/read"
      );
      if (response.status === 200) {
        setWatchList(response.data.data[0].watchList);
        console.log(response.data.data[0].watchList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWatchList();
  }, []);
  return (
    <div id="user-wrapper">
      <h1> Watch List</h1>
      <section className="watchList-container">
        {data.map((item) => (
          // if (watchList.includes(item._id)) {
            watchList.includes(item._id) && <Movie data={item} /> 
        ))}
      </section>
    </div>
  );
}

export default WatchList;
