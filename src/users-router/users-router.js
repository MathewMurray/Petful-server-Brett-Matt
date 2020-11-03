/* eslint-disable strict */
const express = require("express");
const jsonParser = express.json();
const usersRouter = express.Router();
const Queue = require("../queue.js");
const store = require("../store");

let userQueue = new Queue();
store.users.forEach((user) => userQueue.enqueue(user));
console.log("userQueue", userQueue);

usersRouter
  .route("/")
  .get((req, res, next) => {
    let userinfo = {};
    if (!userQueue.isEmpty()) {
      let curr_node = userQueue.first;
      let counter = 0;
      let nextinline = null;
      while (curr_node) {
        //console.log(Date.now() > curr_node.data.entertime+60000)
        if (Date.now() > curr_node.data.entertime + 60000 * 5) {
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
        nextinline: nextinline,
      };
    }
    res.status(200).json(userinfo);
  })
  .post(jsonParser, (req, res, next) => {
    const current_time = Date.now();
    const users = {
      name: req.body.name,
      entertime: current_time,
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
          if (curr_node.next) userQueue.first = curr_node.next;
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
        current_user: curr_node,
      };
    }
    res.status(200).json(userinfo);
  })
  .delete(jsonParser, (req, res, next) => {
    //const to_delete = JSON.stringify(req.body.entertime);
    //let userinfo = {};
    console.log("userQueue", userQueue);
    if (!userQueue.isEmpty()) {
      userQueue.dequeue();
      // let curr_node = userQueue.first;
      // let counter = 0;
      // let nextinline = null;
      // while (curr_node) {
      //   console.log("to_delete", to_delete)
      //   console.log("curr_node.data.entertime", curr_node.data.entertime)
      //   if (
      //     Date.now() > curr_node.data.entertime + 60000 ||
      //     to_delete === curr_node.data.entertime
      //     ) {

      //     console.log("this happens")
      //     if (curr_node.next) {
      //       userQueue.first = curr_node.next;
      //     } else {
      //       userQueue.first = null;
      //     }
      //   } else {
      //     counter++;
      //     if (nextinline === null) {
      //       nextinline = curr_node.data;
      //     }
      //   }
      //   curr_node = curr_node.next;
      // }
      // userinfo = {
      //   count: counter,
      //   nextinline: nextinline,
      // };
    }
    res.status(200).json(userQueue);
  });

module.exports = usersRouter;
