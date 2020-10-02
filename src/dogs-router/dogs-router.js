/* eslint-disable strict */
const express = require('express');
const jsonParser = express.json();
const dogsRouter = express.Router();
const Queue = require('../queue.js');

const dogs = {
  imageURL: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  imageDescription: 'Looks like a cat, is really a dog.',
  name: 'Boo',
  sex: 'Female',
  age: 2,
  breed: 'Boo is Boo',
  story: 'Thug life is hard but Boo is hanging in there'
};
const dogs2 = {
  imageURL: 'https://cdn.pixabay.com/photo/2016/05/09/10/42/weimaraner-1381186_960_720.jpg',
  imageDescription: 'White dog.',
  name: 'Happy',
  sex: 'Female',
  age: 3,
  breed: 'Mutt',
  story: 'Never loved'
};
const dogs3 = {
  imageURL: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg',
  imageDescription: 'I can hear your heart melting with my giant puppy ears.',
  name: 'Innocent',
  sex: 'Female',
  age: 1,
  breed: 'Postgrestion',
  story: 'Unknown'
};

let dogQueue = new Queue();
dogQueue.enqueue(dogs);
dogQueue.enqueue(dogs2);
dogQueue.enqueue(dogs3);

dogsRouter
  .route('/')
  .get((req, res, next) => {
    res.status(200).json(dogQueue.peek());
  })
  .delete((req, res, next) => {
    dogQueue.dequeue();
    res.status(200).json();
  });




module.exports = dogsRouter;