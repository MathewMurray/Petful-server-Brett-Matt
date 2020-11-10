const express = require("express");
const json = require("body-parser").json();

const Pets = require("./pets.service");

const router = express.Router();

router.get("/", (req, res) => {
  const pets = Pets.get();
  res.status(200).json(pets);
});

router.delete("/", json, (req, res) => {
  const { type } = req.body;
  Pets.dequeue(type);
  res.status(204);
});

module.exports = router;
