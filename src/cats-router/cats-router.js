/* eslint-disable strict */
const express = require('express');
const jsonParser = express.json();
const catsRouter = express.Router();
const Queue = require('../queue.js');


const cats = {
  imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
};
const cats2 = {
  imageURL: 'https://cdn.pixabay.com/photo/2016/03/28/10/05/kitten-1285341_960_720.jpg',
  imageDescription: 'Cutest cat ever.',
  name: 'Scruffy',
  sex: 'Female',
  age: 4,
  breed: 'Cutie pie',
  story: 'Unknown'
};

const cats3 = {
  imageURL: 'https://cdn.pixabay.com/photo/2016/12/18/18/42/kittens-1916542_960_720.jpg',
  imageDescription: 'Harry and Patter sittin in a tree, K I S S I N G',
  name: 'Harry and Patter',
  sex: 'Male and Male',
  age: 1,
  story: 'Typical kitten story'
};

const cats4 = {
  imageURL: 'https://cdn.pixabay.com/photo/2019/06/18/11/11/cat-4282096_960_720.jpg',
  imageDescription: 'Typical back leg splayed posture of kitten on tile',
  name: 'Takemehome',
  sex: 'Male',
  age: 1,
  breed: 'Exotic shorthair',
  story: 'Discovered in a kitchen'
};

let catQueue = new Queue();

catQueue.enqueue(cats);
catQueue.enqueue(cats2);
catQueue.enqueue(cats3);
catQueue.enqueue(cats4);

catsRouter
  .route('/')
  .get((req, res, next) => {
    res.status(200).json(catQueue.peek());
  })
  .delete(jsonParser,(req, res, next) => {
    catQueue.dequeue();
    res.status(200).json();
  });

module.exports = catsRouter;