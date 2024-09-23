const mongoose = require("mongoose");
const Joi = require("joi");

const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      min: 0,
      max: 255,
    },
  })
);

const movieValidation = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255),
    dailyRentalRate: Joi.number().min(0).max(255),
  });
  return schema.validate(movie);
};

module.exports = {
  Movie,
  movieValidation,
};
