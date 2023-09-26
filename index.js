var express = require("express");
var app = express();
app.listen(5000);
const moviesRouter = require('./routes/movies')
const router = require("./routes/users");

app.use('/movies/delete', router)
app.use('/movies/update', router)
app.use('/movies', moviesRouter)

