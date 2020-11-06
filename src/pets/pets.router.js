const express = require("express");
const json = require("body-parser").json();

const Pets = require("./pets.service");
const People = require("../people/people.service");
const petsService = require("./pets.service");

const router = express.Router();

router.get("/", (req, res) => {
  // Return all pets currently up for adoption.
  const pets = Pets.get()
  res.status(200).json(pets);
});
router.delete('/', json, (req, res) => {
  const { type } = req.body;
  Pets.dequeue(type).then((pet) => {
    res.status(204).json(pet);
  });
});

router.get("/cat", (req, res) => {
  res.status(200).json();
});

router.get("/dog", (req, res) => {
  res.status(200).json();
});

module.exports = router;