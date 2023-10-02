const Movie = require("../models/movieModel");

exports.read = async (req, res, next) => {
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
  res.json({ data: movies });
};

exports.read_byId = async (req, res) => {
  let id = req.params.ID;

  if (id) {
    try {
      let movies = await Movie.findById(id);
      res.json({message: "ok", data: movies });
    } catch (err) {
      res.status(404).json({
        message: `the movie with id ${id} does not exist`,
      });
    }
  } else {
    res.status(400).json({
      message: "Bad request! id is not specified",
    });
  }
};

exports.add = async (req, res) => {
  let newMovie;
  let title = req.query.title;
  let year = Number(req.query.year);
  let rating = Number(req.query.rating) || 4;

  newMovie = {
    title: title,
    year: year,
    rating: rating,
  };
  if (year && !isNaN(year) && year.toString().length === 4 && title) {
    const instance = new Movie(newMovie);
    await instance.save();
    res.status(200).json({ status: 200, data: await Movie.find() });
  } else {
    res.status(403).json({
      status: 404,
      error: true,
      message:
        "you cannot create a movie without providing a title and a valid year",
    });
  }
};

exports.delete = async (req, res) => {
  let id = req.params.id;
  if (id) {
    try {
      await Movie.findById(id);
    } catch (err) {
      res
        .status(404)
        .json({ message: `the movie with the id ${id} does not exist` });
    }
    await Movie.deleteOne({ _id: id });
    res.status(203).json({ status: 203, data: await Movie.find() });
  } else {
    res.status(404).json({
      status: 404,
      error: true,
      message: "to delete a movie you should specify an id",
    });
  }
};

exports.update = async (req, res) => {
  let id = req.params.id;

  if (id) {
    try {
      await Movie.findById(id);
    } catch (err) {
      res
        .status(404)
        .json({ status: 404, error: true, message: "Movie is Not Found!" });
    }
    let target = await Movie.findById(id);
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
    await Movie.replaceOne({ _id: id }, updatedMovie);

    res.status(203).json({ status: 203, data: await Movie.find() });
  } else {
    res.status(404).json({
      status: 404,
      error: true,
      message: "Bad request! id is not specified",
    });
  }
};
