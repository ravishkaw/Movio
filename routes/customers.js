const { Customer, validateCustomer } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.send(customers);
  } catch (err) {
    res.status(500).send("An error occurred while fetching customers.");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  try {
    const savedCustomer = await customer.save();
    res.status(201).send(savedCustomer);
  } catch (err) {
    res.status(500).send("An error occurred while saving the customer.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById({ _id: req.params.id });

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.send(customer);
  } catch (error) {
    res.status(500).send("An error occurred while fetching customer.");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const customer = await Customer.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
      { new: true }
    );

    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    res.send(customer);
  } catch (error) {
    res.status(500).send("An error occurred while updating customer.");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.send({
      message: "Customer deleted successfully",
      deletedCustomer: customer,
    });
  } catch (error) {
    res.status(500).send("An error occurred while deleting customer.");
  }
});

module.exports = router;
