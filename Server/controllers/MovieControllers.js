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
      res.json({ message: "ok", data: movies });
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
  const {
    title,
    year = 2023,
    rating = 4,
    description = "This is a description",
  } = req.body;
  console.log(req.body);

  newMovie = {
    title: title,
    year: year,
    rating: rating,
    description: description,
  };
  if (year && !isNaN(year) && year.toString().length === 4 && title) {
    const instance = new Movie(newMovie);
    await instance.save();
    res.status(200).json({ status: 200, data: await Movie.find() });
  } else {
    console.log(title, year);
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
    const {
      title,
      year = Number(req.body.year) || target.year,
      rating = Number(req.body.rating) || target.rating,
      description
    } = req.body;
    console.log(description)
    let updatedMovie = {
      id: id,
      title: title ? title : target.title,
      year: year ? year : target.year,
      rating: rating ? rating : target.rating,
      description : description ? description : target.description
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
