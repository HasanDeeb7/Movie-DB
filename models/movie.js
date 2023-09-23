const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    _id:{type: Number, default:mongoose.Types.Number},
  title: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model('MovieModel', MovieSchema)
