const { validateGenre } = require("./validations");

const express = require("express");
const router = express.Router();

const genres = [
  { id: uuidv4(), name: "action" },
  { id: uuidv4(), name: "animation" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  const genre = genres.find((gen) => gen.id === req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  res.send(genre);
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const genre = genres.find((gen) => gen.id === req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send({ message: "Genre deleted successfully", deletedGenre: genre });
});

module.exports = router;
