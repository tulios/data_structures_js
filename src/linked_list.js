var LinkedList = function() {
}

LinkedList.prototype = {

  _head: null,
  _tail: null,
  _length: null,

  constructor: LinkedList,

  add: function(data, index) {
    if (index < 0 || (index !== 0 && !this.get(index - 1))) {
      throw new Error("[LinkedList] #add - " + index + " is out of range");
    }

    this._length = null;
    var node = new LinkedList.Node(data);
    if (!this._head) {
      this._head = this._tail = node;

    } else {
      if (index === 0) { // head
        node.next = this._head;
        this._head = node;

      } else {
        var before = this.get(index - 1);
        var position = before.next;
        before.next = node;
        node.next = position;
      }
    }
  },

  addAll: function(array) {
    for (var i = 0; i < array.length; i++) {
      this.addLast(array[i]);
    }
  },

  addFirst: function(data) {
    this.add(data, 0);
  },

  addLast: function(data) {
    this._length = null;
    var node = new LinkedList.Node(data);
    if (!this._tail) {
      this._head = this._tail = node;

    } else {
      this._tail.next = node;
      this._tail = node;
    }
  },

  clear: function() {
    this._head = this._tail = this._length = null;
  },

  contains: function(data) {
    var node = this._head;
    while(node) {
      if (node.data === data) {
        return true;
      }
      node = node.next;
    }
    return false;
  },

  getFirst: function() {
    return this._head;
  },

  getLast: function() {
    return this._tail;
  },

  get: function(index) {
    var node = this._head;
    var i = 0;
    while(node) {
      if (i === index) {
        return node;
      }

      i++;
      node = node.next;
    }

    return null;
  },

  remove: function(index) {
    if (index < 0 || index > (this.size() - 1)) {
      throw new Error("[LinkedList] #remove - " + index + " is out of range");
    }

    this._length = null;
    if (index === 0) {
      var oldHead = this._head;
      this._head = oldHead.next;
      return oldHead;
    }

    var previous = this.get(index - 1);
    var node = previous.next;
    previous.next = node.next;
    return node;
  },

  size: function() {
    if (this._length !== null) {
      return this._length;
    }

    var count = 0;
    var node = this._head;

    if (node) {
      do {
        count++;
        node = node.next;
      } while (node);
    }

    return this._length = count;
  },

  isEmpty: function() {
    return this.size() === 0;
  },

  toArray: function() {
    var node = this._head;
    var array = [];
    while(node) {
      array.push(node.data);
      node = node.next;
    }

    return array;
  }

}

LinkedList.Node = function(data) {
  this.data = data;
}

LinkedList.Node.prototype = {
  next: null,
  data: null
}
