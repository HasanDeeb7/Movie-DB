const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RatingSchema = new Schema({
  critics: { type: Number, required: true },
  audience: Number,
});

module.exports = mongoose.model('Rating', RatingSchema )

