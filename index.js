var express = require("express");
var app = express();
app.listen(5000);
app.get("/test", (req, res) => {
  res.send({ status: 200, message: "ok" });
});
app.get("/time", (req, res) => {
  const date = new Date();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  res.status(200).json({ status: 200, message: `${hours} : ${seconds}` });
});
app.get("/hello/:id?", (req, res) => {
  const id = req.params.id || "there";
  res.status(200).json({ status: 200, message: `hello, ${id}` });
});
app.get("/search", (req, res) => {
  if (req.query.s) {
    res.status(200).json({ status: 200, message: "ok", data: req.query.s });
  } else {
    res
      .status(500)
      .json({ status: 500, message: "you should provide a search" });
  }
});

app.get("/movies/read/:sorted?", (req, res, next) => {
  if (req.params.sorted === "id") {
    next();
  }
  let sorted = req.params.sorted || "bad request";
  let sortedMovies = movies;
  switch (sorted) {
    case "by-date":
      sortedMovies = movies.sort((objA, objB) => {
        return objA.year - objB.year;
      });
      res.status(200).json({
        status: 200,
        message: "sorted by release date",
        data: sortedMovies,
      });
      break;
    case "by-rating":
      sortedMovies = movies.sort((objA, objB) => {
        return objA.rating - objB.rating;
      });
      res
        .status(200)
        .json({ status: 200, message: "sorted by rating", data: sortedMovies });
      break;
    case "by-title":
      sortedMovies = movies.sort((objA, objB) =>
        objA.title < objB.title ? -1 : 1
      );
      res
        .status(200)
        .json({ status: 200, message: "sorted by title", data: sortedMovies });
      break;
    default:
      res
        .status(200)
        .json({ status: 400, message: "not sorted", data: sortedMovies });
  }
});
app.get("/movies/read/id/:ID?", (req, res) => {
  let id = req.params.ID;
  if (id > 0 && id <= movies.length) {
    res.status(200).json({ status: 200, message: "ok", data: movies[id - 1] });
  } else {
    res.status(id ? 404 : 500).json({
      status: id ? 404 : 500,
      message: id
        ? `the movie with id ${id} does not exist`
        : "faild to get request, you need to set an id",
    });
  }
});
const movies = [
  { id: 1, title: "Jaws", year: 1975, rating: 8 },
  { id: 2, title: "Avatar", year: 2009, rating: 7.8 },
  { id: 3, title: "Brazil", year: 1985, rating: 8 },
  { id: 4, title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
];
