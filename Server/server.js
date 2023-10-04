var express = require("express");
var cors = require("cors");
var app = express();
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
const moviesRouter = require("./routes/movies");
const router = require("./routes/users");

app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' })); 
app.use(cors());
app.use("/movies/delete", router);
app.use("/movies/update", router);
app.use("/movies", moviesRouter);
