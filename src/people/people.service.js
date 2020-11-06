const Queue = require('../queue/Queue')
const store = require('../store')

// Set up initial data.
// --------------------

const people = new Queue()
store.people.forEach(person => people.enqueue(person))

// --------------------

module.exports = {
  get() {
    return Promise.resolve(people.all());
  },

  enqueue(person) {
    people.enqueue(person);
    return Promise.resolve();
  },

  dequeue() {
    return Promise.resolve(people.dequeue());
  },
};