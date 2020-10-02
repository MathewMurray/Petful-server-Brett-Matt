/* eslint-disable strict */
const express = require('express');
const jsonParser = express.json();
const usersRouter = express.Router();
const Queue = require('../queue.js');

let userQueue = new Queue();

usersRouter
  .route('/')
  .get((req, res, next) => {
    let userinfo = {};
    if (!userQueue.isEmpty()) {
      let curr_node = userQueue.first;
      let counter = 0;
      let nextinline = null;
      while (curr_node) {
        //console.log(Date.now() > curr_node.data.entertime+60000)
        if (Date.now() > curr_node.data.entertime + (60000 * 5)) {
          if (curr_node.next) {
            userQueue.first = curr_node.next;
          } else {
            userQueue.first = null;
          }
        } else {
          counter++;
          if (nextinline === null) {
            nextinline = curr_node;
          }
        }
        curr_node = curr_node.next;
      }
      userinfo = {
        count: counter,
        nextinline: nextinline
      };
    }
    res.status(200).json(userinfo);
  })
  .post((req, res, next) => {
    const current_time = Date.now();
    const users = {
      entertime: current_time
    };
    userQueue.enqueue(users);
    let userinfo = {};
    if (!userQueue.isEmpty()) {
      let curr_node = userQueue.first;
      let counter = 0;
      let nextinline = null;
      while (curr_node) {
        //console.log(Date.now() > curr_node.data.entertime+60000)
        if (Date.now() > curr_node.data.entertime + 60000) {
          if (curr_node.next)
            userQueue.first = curr_node.next;
        } else {
          counter++;
          if (nextinline === null) {
            nextinline = curr_node;
          }
        }
        curr_node = curr_node.next;
      }
      userinfo = {
        count: counter,
        nextinline: nextinline,
        current_user: current_time
      };
    }
    res.status(200).json(userinfo);
  })
  .delete(jsonParser, (req, res, next) => {

    const to_delete = JSON.stringify(req.body.entertime);
    let userinfo = {};
    if (!userQueue.isEmpty()) {
      let curr_node = userQueue.first;
      let counter = 0;
      let nextinline = null;
      while (curr_node) {
        if (Date.now() > curr_node.data.entertime + 60000 || to_delete === curr_node.data.entertime) {
          if (curr_node.next) {
            userQueue.first = curr_node.next;
          } else {
            userQueue.first = null;
          }
        } else {
          counter++;
          if (nextinline === null) {
            nextinline = curr_node.data;
          }
        }
        curr_node = curr_node.next;
      }
      userinfo = {
        count: counter,
        nextinline: nextinline
      };
    }
    res.status(200).json();
  });

module.exports = usersRouter;