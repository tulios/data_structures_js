var BinaryTree = function(comparator) {
  this.comparator = comparator || new BinaryTree.Comparator();
}

BinaryTree.prototype = {

  _root: null,

  constructor: BinaryTree,

  add: function(data) {
    this._root = this._recursiveAdd(data, this._root, null);
  },

  remove: function(data) {
    var self = this;
    var node = this._recursiveGet(this._root, data);
    var parent = node.parent;
    var linkNodes = function(parent, node, newNode) {
      if (node.isRoot()) {
        self._root = newNode;

      } else {
        if (parent.left === node) {
          parent.left = newNode;
        } else {
          parent.right = newNode;
        }
      }
    }

    if (node.isLeaf()) {
      linkNodes(parent, node, null);

    } else if (!node.right && node.left) {
      linkNodes(parent, node, node.left);

    } else if (!node.left && node.right) {
      linkNodes(parent, node, node.right);

    } else {
      var minimunNode = this._minimumValueInRight(node);
      linkNodes(parent, node, minimunNode);
      linkNodes(minimunNode.parent, minimunNode, null);
      minimunNode.left = node.left;
      minimunNode.right = node.right;
    }
  },

  contains: function(data) {
    return !!this._recursiveGet(this._root, data);
  },

  size: function() {
    return this._recursiveSize(this._root);
  },

  isEmpty: function() {
    return this.size() === 0;
  },

  depth: function() {
    return this._recursiveMaxDepth(this._root);
  },

  inOrderEach: function(callback) {
    this._recursiveInOrder(this._root, callback);
  },

  preOrderEach: function(callback) {
    this._recursivePreOrder(this._root, callback);
  },

  postOrderEach: function(callback) {
    this._recursivePostOrder(this._root, callback);
  },

  toArray: function(methodName) {
    var array = [];
    if (methodName !== "preOrder" && methodName !== "postOrder") {
      methodName = "inOrder";
    }

    this[methodName + "Each"](function(node) { array.push(node.data); });
    return array;
  },

  _recursiveMaxDepth: function(node) {
    if (!node) {
      return 0;
    }

    var leftDepth = this._recursiveMaxDepth(node.left);
    var rightDepth = this._recursiveMaxDepth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
  },

  _minimumValueInRight: function(startNode) {
    var array = [];
    this._recursiveInOrder(startNode.right, function(node) {
      array.push(node);
    });
    return array[0];
  },

  _recursiveInOrder: function(node, callback) {
    if (!node) return;
    this._recursiveInOrder(node.left, callback);
    callback(node);
    this._recursiveInOrder(node.right, callback);
  },

  _recursivePreOrder: function(node, callback) {
    if (!node) return;
    callback(node);
    this._recursivePreOrder(node.left, callback);
    this._recursivePreOrder(node.right, callback);
  },

  _recursivePostOrder: function(node, callback) {
    if (!node) return;
    this._recursivePostOrder(node.left, callback);
    this._recursivePostOrder(node.right, callback);
    callback(node);
  },

  _recursiveGet: function(node, data) {
    if (!node) {
      return null;
    }

    if (this._compare(data, node.data) === 0) {
      return node;

    } else if (this._compare(data, node.data) < 0) {
      return this._recursiveGet(node.left, data);

    } else {
      return this._recursiveGet(node.right, data);
    }
  },

  _recursiveSize: function(node) {
    if (!node) {
      return 0;
    }

    return 1 + this._recursiveSize(node.left) + this._recursiveSize(node.right);
  },

  _recursiveAdd: function(data, node, parent) {
    if (!node) {
      node = new BinaryTree.Node(data, parent);

    } else {

      if (this._compare(data, node.data) <= 0) {
        node.left = this._recursiveAdd(data, node.left, node);

      } else {
        node.right = this._recursiveAdd(data, node.right, node);
      }

    }

    return node;
  },

  _compare: function(v1, v2) {
    return this.comparator.compare(v1, v2);
  }

}

BinaryTree.Node = function(data, parent) {
  this.data = data;
  this.parent = parent;
}

BinaryTree.Node.prototype = {
  data: null,
  left: null,
  right: null,
  parent: null,

  isLeaf: function() {
    return !this.left && !this.right;
  },

  isRoot: function() {
    return !this.parent;
  }
}

BinaryTree.Comparator = function(impl) {
  this.impl = impl || this.defaultFunction;
}

BinaryTree.Comparator.prototype = {

  defaultFunction: function(v1, v2) {
    if (v1 > v2) {
      return 1;

    } else if (v1 < v2) {
      return -1;

    } else if (v1 === v2) {
      return 0;
    }

    return null;
  },

  compare: function(v1, v2) {
    return this.impl(v1, v2);
  }

}
