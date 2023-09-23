var express = require("express");
var app = express();
app.listen(5000);
require("dotenv").config();
var movieID = 6

const mongoose = require("mongoose");
const Movie = require("./models/movie");
mongoose.set("strictQuery", false);
const mongoDB = process.env.URL || "";

const main = async () => {
  await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
main().catch((err) => {
  console.log(err);
});


app.get("/movies/read/:sorted?", async (req, res, next) => {
  if (req.params.sorted === "id") {
    next();
  }
  let sorted = req.params.sorted || "bad request";
  let movies = await Movie.find({});
  switch (sorted) {
    case "by-date":
      movies = await Movie.find({}).sort({ year: -1 });
      break;
    case "by-rating":
      movies = await Movie.find().sort({ rating: -1 });
      break;
    case "by-title":
      movies = await Movie.find().sort({ title: 1 });
      break;
    default:
      movies;
  }
  res.status(200).json({ status: 400, data: movies });
});

app.get("/movies/read/id/:ID?", async (req, res) => {
  let id = Number(req.params.ID);
  let movies = await Movie.find({ _id: id });
  if (movies.length > 0) {
    res.status(200).json({ status: 200, message: "ok", data: movies });
  } else {
    res.status(id ? 404 : 400).json({
      status: id ? 404 : 400,
      message:
        id || id >= 0
          ? `the movie with id ${id} does not exist`
          : "faild to get request, you need to set an id",
    });
  }
});

app.post("/movies/add?", async (req, res) => {
  let newMovie;

  let title = req.query.title;
  let year = Number(req.query.year);
  let rating = Number(req.query.rating) || 4;
  movieID+=1
   newMovie = {
    _id: movieID,
    title: title,
    year: year,
    rating: rating
  };
  if (year && !isNaN(year) && year.toString().length === 4 && title) {

      const instance = new Movie(newMovie)
      await instance.save()
      res.status(200).json({status:200, data: await Movie.find()})
    
  } else {
    res.status(403).json({
      status: 404,
      error: true,
      message:
        "you cannot create a movie without providing a title and a valid year",
    });
  }
});
app.delete("/movies/delete/:id?", (req, res) => {
  let id = Number(req.params.id);
  if (id && movies.some((obj) => obj.id === id)) {
    movies = movies.filter((obj) => {
      return obj.id !== id;
    });
    res.status(203).json({ status: 203, data: movies });
  } else {
    res.status(404).json({
      status: 404,
      error: true,
      message: id
        ? `the movie with the id ${id} does not exist`
        : "to delete a movie you should specify an id",
    });
  }
});
app.patch("/movies/update/:id?", (req, res) => {
  let id = Number(req.params.id);

  if (id && movies.some((obj) => obj.id === id)) {
    let target = movies[id - 1];
    let newTitle = req.query.title;
    let newYear = !isNaN(Number(req.query.year))
      ? Number(req.query.year)
      : target.year;
    let newRating = !isNaN(Number(req.query.rating))
      ? Number(req.query.rating)
      : target.rating;
    let updatedMovie = {
      id: id,
      title: newTitle ? newTitle : target.title,
      year: newYear ? newYear : target.year,
      rating: newRating ? newRating : target.rating,
    };
    movies = movies.map((obj) => {
      if (obj.id === id) {
        return (obj = updatedMovie);
      }
      return obj;
    });

    res.status(203).json({ status: 203, data: movies });
  } else {
    res
      .status(404)
      .json({ status: 404, error: true, message: "id not found!" });
  }
});
