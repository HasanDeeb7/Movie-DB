const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const YearSchema = new Schema({
  year: { type: Number, required: true, min: 1500}
  
});

module.exports = mongoose.model('Year', YearSchema )
