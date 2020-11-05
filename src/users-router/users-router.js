/* eslint-disable strict */
const express = require("express");
const jsonParser = express.json();
const usersRouter = express.Router();
const Queue = require("../queue.js");

let userQueue = new Queue();
let initialUsers = [
  "Christen Coggin",
  "Buddy Blakely",
  "Britany Bowie",
  "Rashad Roa",
];
initialUsers.forEach((user) => userQueue.enqueue(user));

usersRouter
  .route("/")
  .get((req, res, next) => {
    console.log("Get", userQueue.peek());
    res.status(200).json(userQueue.peek());
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body;
    userQueue.enqueue(name);
    console.log("Post", userQueue.peek());
    res.status(200).json(userQueue.peek());
  })
  .delete(jsonParser, (req, res, next) => {
    userQueue.dequeue();
    console.log("delete", userQueue.peek());
    res.status(200).json(userQueue.peek());
  });

module.exports = usersRouter;
