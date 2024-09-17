const { v4: uuidv4 } = require("uuid");
const { validateGenre } = require("./validations");

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
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = {
    id: uuidv4(),
    name: req.body.name,
  };
  genres.push(genre);
  res.status(201).send(genre);
});

app.get("/api/movies/genres/:id", (req, res) => {
  const genre = genres.find((gen) => gen.id === req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  res.send(genre);
});

app.put("/api/movies/genres/:id", (req, res) => {
  const genre = genres.find((gen) => gen.id === req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/movies/genres/:id", (req, res) => {
  const genre = genres.find((gen) => gen.id === req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send({ message: "Genre deleted successfully", deletedGenre: genre }); 
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
