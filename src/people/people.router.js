const express = require("express");
const json = require("body-parser").json();

const People = require("./people.service");

const router = express.Router();

router.get("/", (req, res) => {
  // Return all the people currently in the queue.
  people = People.get();
  if (!people) {
    res.status(400).json({ error: { message: "No people list" } });
  } else {
    res.json(people);
  }
});

router.post("/", json, (req, res) => {
  // Add a new person to the queue.
  let { person } = req.body;
  try {
    People.enqueue(person);
    res.status(200).json(People.get());
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
