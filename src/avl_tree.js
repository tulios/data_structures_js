var AVLTree = function(comparator) {
  this.comparator = comparator || new BinaryTree.Comparator();
}

AVLTree.prototype = extend(BinaryTree, {

  constructor: AVLTree,

  depth: function() {
    return this._root.height;
  },

  _height: function(node) {
    return !node ? 0 : node.height;
  },

  _recursiveAdd: function(data, node, parent) {
    if (!node) {
      node = new AVLTree.Node(data, parent);

    } else {

      if (this._compare(data, node.data) < 0) {
        node.left = this._recursiveAdd(data, node.left, node);
        if (this._height(node.left) - this._height(node.right) > 1) {
          if (this._compare(data, node.left.data) < 0) {
            node = this._singleLeftRotate(node);

          } else {
            node = this._doubleLeftRotate(node);
          }
        }

      } else if (this._compare(data, node.data) > 0) {
        node.right = this._recursiveAdd(data, node.right, node);
        if (this._height(node.right) - this._height(node.left) > 1) {
          if (this._compare(data, node.right.data) > 0) {
            node = this._singleRightRotate(node);

          } else {
            node = this._doubleRightRotate(node);
          }
        }
      }

    }

    node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
    return node;
  },

  _singleLeftRotate: function(node) {
    var leftNode = node.left;
    node.left = leftNode.right;
    leftNode.right = node;

    node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
    leftNode.height = Math.max(this._height(leftNode.left), this._height(node)) + 1;
    return leftNode;
  },

  _singleRightRotate: function(node) {
    var rightNode = node.right;
    node.right = rightNode.left;
    rightNode.left = node;

    node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
    rightNode.height = Math.max(this._height(rightNode.right), this._height(node)) + 1;
    return rightNode;
  },

  _doubleLeftRotate: function(node) {
    node.left = this._singleRightRotate(node.left);
    return this._singleLeftRotate(node);
  },

  _doubleRightRotate: function(node) {
    node.right = this._singleLeftRotate(node.right);
    return this._singleRightRotate(node);
  }

});

AVLTree.Node = function(data, parent) {
  this.data = data;
  this.parent = parent;
}

AVLTree.Node.prototype = extend(BinaryTree.Node, {
  constructor: AVLTree.Node,
  height: 0
});
