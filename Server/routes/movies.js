const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage})
require("dotenv").config();

const moviesController = require('../controllers/MovieControllers')

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
router.get("/read/:sorted?", moviesController.read);

router.get("/read/id/:ID?", moviesController.read_byId);

router.post("/add?", upload.single('image'),moviesController.add);

router.delete("/delete/:id?", moviesController.delete);

router.patch("/update/:id?",upload.single('image'), moviesController.update);

module.exports = router;