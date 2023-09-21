var express = require("express");
var app = express();
app.listen(5000);
app.get("/", (req, res) => {
  res.send("OK");
});
