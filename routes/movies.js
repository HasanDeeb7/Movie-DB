const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Movie = require("../models/movieModel");
require("dotenv").config();

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




router.get("/read/:sorted?", async (req, res, next) => {
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
  
  router.get("/read/id/:ID?", async (req, res) => {
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
  
  router.post("/add?", async (req, res) => {
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
  });
  
  router.delete("/delete/:id?", async (req, res) => {
    let id = req.params.id;
    if (id && (await Movie.findOne({ _id: id }))) {
      await Movie.deleteOne({ _id: id });
      res.status(203).json({ status: 203, data: await Movie.find() });
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
  
  router.patch("/update/:id?", async (req, res) => {
    let id = Number(req.params.id);
  
    if (id && (await Movie.findOne({ _id: id }))) {
      let target = await Movie.findOne({ _id: id });
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
      res
        .status(404)
        .json({ status: 404, error: true, message: "id not found!" });
    }
  });

module.exports = router;
