const { Genre, validateGenre } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (err) {
    res.status(500).send("An error occurred while fetching genres.");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = new Genre({ name: req.body.name });
  try {
    const savedGenre = await genre.save();
    res.status(201).send(savedGenre);
  } catch (err) {
    res.status(500).send("An error occurred while saving the genre.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById({ _id: req.params.id });

    if (!genre) {
      return res.status(404).send("Genre not found");
    }

    res.send(genre);
  } catch (error) {
    res.status(500).send("An error occurred while fetching genre.");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const genre = await Genre.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      { new: true }
    );

    if (!genre) {
      return res.status(404).send("Genre not found");
    }
    res.send(genre);
  } catch (error) {
    res.status(500).send("An error occurred while updating genre.");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) {
      return res.status(404).send("Genre not found");
    }

    res.send({ message: "Genre deleted successfully", deletedGenre: genre });
  } catch (error) {
    res.status(500).send("An error occurred while deleting genre.");
  }
});

module.exports = router;
