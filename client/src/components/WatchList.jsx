import React, { Fragment, useEffect, useState } from "react";
import "../style/user.css";

import { Movie } from "./MovieCard";

function WatchList(props) {
  const { data, watchList, triggerEffect, effect } = props;

  return (
    <div id="user-wrapper">
      <h1> Watch List</h1>
      <section id="movies-container">
        {watchList
          ? data.map(
              (item) =>
                watchList.includes(item._id) && (
                  <Fragment key={item._id}>
                    {" "}
                    <Movie data={item} isInWatchList={true} triggerEffect={triggerEffect} effect={effect} />{" "}
                  </Fragment>
                )
            )
          : "WatchList is empty"}
      </section>
    </div>
  );
}

export default WatchList;
