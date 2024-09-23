const Joi = require("joi");

// Genre Validation
const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
};

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(3).required(),
  });
  return schema.validate(customer);
};

module.exports = { validateGenre, validateCustomer };
