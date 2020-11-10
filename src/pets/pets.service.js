const Queue = require("../queue/Queue");
const store = require("../store");

// Set up initial data.
// --------------------

const pets = {
  cats: new Queue(),
  dogs: new Queue(),
};

store.cats.forEach((cat) => pets.cats.enqueue(cat));
store.dogs.forEach((dog) => pets.dogs.enqueue(dog));
// --------------------

module.exports = {
  get() {
    // Return the pets next in line to be adopted.
    return [[...pets.cats.all()], [...pets.dogs.all()]];
  },

  dequeue(type) {
    // Remove a pet from the queue.
    if (type === 'cat') {
      let cat = pets.cats.dequeue();
      pets.cats.enqueue(cat);
    } else if (type === 'dog') {
      let dog = pets.dogs.dequeue();
      pets.dogs.enqueue(dog);
    } else if (type === 'both') {
      let cat = pets.cats.dequeue();
      let dog = pets.dogs.dequeue();
      pets.dogs.enqueue(dog);
      pets.cats.enqueue(cat);
    } else {
      throw new Error({error: {message: `${type} is not a valid type. 'cat' or 'dog' only.`}})
    }
    return false;
  },
};
