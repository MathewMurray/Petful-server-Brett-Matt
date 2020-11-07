const Queue = require("../queue/Queue");
const store = require("../store");

const people = new Queue();
store.people.forEach((person) => people.enqueue(person));

module.exports = {
  get() {
    console.log("get -> people.all()", people.all());
    return Promise.resolve(people.all());
  },

  enqueue(person) {
    people.enqueue(person);
    console.log("enqueue -> people.all()", people.all());
    return Promise.resolve(people.all());
  },

  dequeue() {
    people.dequeue();
    console.log("dequeue -> people.all()", people.all());
    return Promise.resolve(people.all());
  },
};
