const mongoose = require("mongoose");
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/movio")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());

app.use("/", home);
app.use("/api/movies/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
