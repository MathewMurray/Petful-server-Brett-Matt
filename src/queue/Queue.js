class _node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    // Add some data to the queue.
    const node = new _node(data);
    if (!this.first) {
      this.first = node;
    }
    if (this.last) {
      this.last.next = node;
    }
    this.last = node;
  }

  dequeue() {
    // Remove some data from the queue.
    if (!this.first) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;
    if (node == this.last) {
      this.last = null;
    }
    return node.value;
  }

  show() {
    // Return the next item in the queue.
    return this.first.value;
  }

  all() {
    // Return all items in the queue as a array.
    let node = this.first;
    const results = [];
    while (node != null) {
      results.push(node.value);
      node = node.next;
    }
    return results;
  }
}

module.exports = Queue;