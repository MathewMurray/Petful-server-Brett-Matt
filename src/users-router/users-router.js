/* eslint-disable strict */
const express = require('express');
const jsonParser = express.json();
const usersRouter = express.Router();
const Queue = require('../queue.js');
const store = require('../store');

let userQueue = new Queue();
//store.users.forEach((user) => userQueue.enqueue(user));
// console.log('userQueue', userQueue);

usersRouter
  .route('/')
  .get((req, res, next) => {
    res.status(200).json(userQueue.peek());
  })
  .post(jsonParser, (req, res, next) => {
    const {name} = req.body;
    userQueue.enqueue(name);
    res.status(200).json(userQueue);
  })
  .delete(jsonParser, (req, res, next) => {
    userQueue.dequeue();
    res.status(200).json(userQueue);
  });

module.exports = usersRouter;
