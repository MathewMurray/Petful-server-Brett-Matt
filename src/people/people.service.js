const Queue = require("../queue/Queue");
const store = require("../store");

const people = new Queue();
store.people.forEach((person) => people.enqueue(person));

module.exports = {
  get() {
    return Promise.resolve(people.all());
  },

  enqueue(person) {
    people.enqueue(person);
    return Promise.resolve(people.all());
  },

  dequeue() {
    people.dequeue();
    return Promise.resolve(people.all());
  },
};
