
var express = require("express");
var app = express();
app.listen(5000);
app.get("/test", (req, res) => {
  res.send({status: 200, message:'ok'});
});
app.get("/time", (req, res) => {
  const date = new Date()
  const hours = date.getHours()
  const seconds = date.getSeconds()
  res.status(200).json({status: 200, message:`${hours} : ${seconds}`});
});
