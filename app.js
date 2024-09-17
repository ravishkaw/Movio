const { v4: uuidv4 } = require("uuid");
const express = require("express");
const app = express();

const genres = [
  { id: uuidv4(), name: "action" },
  { id: uuidv4(), name: "animation" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello welcome to Movio");
});

app.get("/api/movies/genres", (req, res) => {
  res.send(genres);
});

app.post("/api/movies/genres", (req, res) => {
  const genre = {
    id: uuidv4(),
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genres);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
