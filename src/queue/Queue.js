class Queue {
  constructor() {
    this.array = [];
  }

  enqueue(data) {
    this.array.push(data);
  }

  dequeue() {
    if (this.array.length > 0) {
      this.array.shift()
     
      return this.array;
    }
    return this.array;
  }

  show() {
    if (this.array.length > 0) {
      return this.array[0];
    }
    return null;
  }

  all() {
    return this.array;
  }
}

module.exports = Queue;
