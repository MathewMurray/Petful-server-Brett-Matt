/* eslint-disable strict */

const Node = require('./node.js');
class Queue {
  constructor () {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(item) {
    const newNode = new Node(item);
    if (!this.first) {
      this.first = newNode;
    }
    else if (this.last) {
      this.last.next = newNode;
    }
    this.last = newNode;
    this.length++;
  }

  dequeue() {
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;

    if (node === this.last) {
      this.last = null;
    }
    this.length--;
    return node.data;
  }

  peek() {
    if (!this.first) return null;
    return this.first;
  }

  isEmpty() {
    if (!this.first && !this.last) {
      return true;
    }
    return false;
  }

}

function peek(queue) {
  if (!queue.first) return null;
  return queue.first;
}

function isEmpty(queue) {
  if (!queue.first && !queue.last) {
    return true;
  }
  return false;
}

function display(queue) {
  let results = '';
  let currNode = queue.first;
  if (!currNode) return 'Your queue is empty';
  else if (!currNode.next) {
    results += `${currNode.data}->null`;
    return results;
  }
  // if(!currNode.next) {
  //   console.log(`${currNode.data}->null`)
  //   return
  // }
  else {
    while (currNode) {
      results += `${currNode.data}->`;
      currNode = currNode.next;
    }
    results += 'null';
    return results;
  }
}

module.exports = Queue;