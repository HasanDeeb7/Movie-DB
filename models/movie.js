const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
  _id: Number,
  title: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
});
const IdCounter = new mongoose.Schema({
  count:Number
})

module.exports ={ Movie :mongoose.model("MovieModel", MovieSchema),
Counter: mongoose.model('Counter', IdCounter)}
