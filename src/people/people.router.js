const express = require("express");
const json = require("body-parser").json();
const store = require("../store");
const People = require("./people.service");
const router = express.Router();

router.get("/", (req, res) => {
  People.get()
    .then((people) => {
      res.json(people);
    })
    .catch(() => console.error("error"));
});
router.post("/", json, (req, res) => {
  const { name } = req.body;
  People.enqueue(name)
    .then((people) => {
      res.json(people);
    })
    .catch(() => console.error("error"));
});
router.delete("/", (req, res) => {
  People.dequeue()
    .then((people) => {
      res.json(people);
    })
    .catch(() => console.error("error"));
});

module.exports = router;
