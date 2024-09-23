const { Movie, movieValidation } = require("../models/movie");
const { Genre } = require("../models/genre");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (err) {
    res.status(500).send("An error occurred while fetching movies.");
  }
});

router.post("/", async (req, res) => {
  const { error } = movieValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre;
  try {
    genre = await Genre.findById(req.body.genreId);
    if (!genre) {
      return res.status(404).send("Genre not found");
    }
  } catch (err) {
    return res.status(400).send("Invalid genre ID");
  }

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  try {
    const savedMovie = await movie.save();
    res.status(201).send(savedMovie);
  } catch (error) {
    res.status(500).send("An error occurred while saving the movie.");
  }
});

module.exports = router;
