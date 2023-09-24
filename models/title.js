const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TitleSchema = new Schema({
  title: { type: String, required: true },
});

module.exports = mongoose.model('Title', TitleSchema )

