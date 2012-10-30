describe("BinaryTree", function() {
  var tree = null;
  beforeEach(function() {
    tree = new BinaryTree();
  });

  it("should accept different comparators", function() {
    var comparator = new BinaryTree.Comparator(function(v1, v2) {
      return v1 === 1 ? 0 : -1;
    });

    tree = new BinaryTree(comparator);
    tree.add(1);
    tree.add(2);
    tree.add(3);

    expect(tree.contains(1)).toEqual(true);
    expect(tree.contains(2)).toEqual(false);
    expect(tree.contains(3)).toEqual(false);
  });

  describe("#add", function() {

    it("should add items to the tree", function() {
      expect(tree.size()).toEqual(0);
      tree.add(2);
      tree.add(1);
      tree.add(3);
      expect(tree.size()).toEqual(3);
      expect(tree.contains(1)).toEqual(true);
      expect(tree.contains(2)).toEqual(true);
      expect(tree.contains(3)).toEqual(true);
    });

    it("should have a reference to parent", function() {
      expect(tree.size()).toEqual(0);
      tree.add(2);
      expect(tree._root.isRoot()).toEqual(true);
      tree.add(1);
      expect(tree._root.left.isLeaf()).toEqual(true);
      expect(tree._root.left.parent).toEqual(tree._root);
    });

  });

  describe("#remove", function() {

    //     2
    //  1     3
    //
    it("should remove leafs", function() {
      tree.add(2);
      tree.add(1);
      tree.add(3);

      expect(tree.contains(1)).toEqual(true);
      tree.remove(1);
      expect(tree.contains(1)).toEqual(false);
      expect(tree.toArray()).toEqual([2, 3]);

      expect(tree.contains(3)).toEqual(true);
      tree.remove(3);
      expect(tree.contains(3)).toEqual(false);
      expect(tree.toArray()).toEqual([2]);
    });

    //      3
    //    2
    //  1
    it("should remove nodes without right", function() {
      tree.add(3);
      tree.add(2);
      tree.add(1);

      expect(tree.contains(2)).toEqual(true);
      tree.remove(2);
      expect(tree.contains(2)).toEqual(false);
      expect(tree.toArray()).toEqual([1, 3]);
    });

    //  1
    //    2
    //      3
    it("should remove nodes without left", function() {
      tree.add(1);
      tree.add(2);
      tree.add(3);

      expect(tree.contains(2)).toEqual(true);
      tree.remove(2);
      expect(tree.contains(2)).toEqual(false);
      expect(tree.toArray()).toEqual([1, 3]);
    });

    //      05
    //  02      12
    //      09      21
    //          19      25
    it("should remove nodes that has two children", function() {
      tree.add(5);
      tree.add(2);
      tree.add(12);
      tree.add(9);
      tree.add(21);
      tree.add(19);
      tree.add(25);

      expect(tree.contains(12)).toEqual(true);
      tree.remove(12);
      expect(tree.contains(12)).toEqual(false);
      expect(tree.toArray()).toEqual([2, 5, 9, 19, 21, 25]);
    });

    it("should remove the root without nodes on right", function() {
      tree.add(3);
      tree.add(2);
      tree.add(1);

      expect(tree.contains(3)).toEqual(true);
      tree.remove(3);
      expect(tree.contains(3)).toEqual(false);
      expect(tree.toArray()).toEqual([1, 2]);
    });

    it("should remove the root without nodes on left", function() {
      tree.add(1);
      tree.add(2);
      tree.add(3);

      expect(tree.contains(1)).toEqual(true);
      tree.remove(1);
      expect(tree.contains(1)).toEqual(false);
      expect(tree.toArray()).toEqual([2, 3]);
    });

  });

  describe("#contains", function() {

    it("should verify the existence of the item", function() {
      expect(tree.size()).toEqual(0);
      tree.add(1);
      tree.add(2);
      tree.add(3);
      expect(tree.contains(1)).toEqual(true);
      expect(tree.contains(4)).toEqual(false);
    });

    it("should return false for different types", function() {
      expect(tree.contains("x")).toEqual(false);
    });

    it("should work with empty trees", function() {
      tree = new BinaryTree();
      expect(tree.contains(1)).toEqual(false);
    });

  });

  describe("#inOrderEach", function() {

    it("should use the order: Left child, Root, Right child", function() {
      tree.add(2);
      tree.add(1);
      tree.add(3);
      var order = [];
      tree.inOrderEach(function(node) {
        order.push(node.data);
      });

      expect(order).toEqual([1, 2, 3]);
    });

  });

  describe("#preOrderEach", function() {

    it("should use the order: Root, Left child, Right child", function() {
      tree.add(2);
      tree.add(1);
      tree.add(3);
      var order = [];
      tree.preOrderEach(function(node) {
        order.push(node.data);
      });

      expect(order).toEqual([2, 1, 3]);
    });

  });

  describe("#postOrderEach", function() {

    it("should use the order: Left Child, Right child, Root", function() {
      tree.add(2);
      tree.add(1);
      tree.add(3);
      var order = [];
      tree.postOrderEach(function(node) {
        order.push(node.data);
      });

      expect(order).toEqual([1, 3, 2]);
    });

  });

  describe("#toArray", function() {

    beforeEach(function() {
      tree.add(2);
      tree.add(1);
      tree.add(3);
    });

    it("should use inOrder by default", function() {
      expect(tree.toArray()).toEqual([1, 2, 3]);
    });

    it("should accept preOrder", function() {
      expect(tree.toArray("preOrder")).toEqual([2, 1, 3]);
    });

    it("should accept postOrder", function() {
      expect(tree.toArray("postOrder")).toEqual([1, 3, 2]);
    });

  });

  describe("#depth", function() {

    it("should return '0' as depth of an empty tree", function() {
      expect(tree.isEmpty()).toEqual(true);
      expect(tree.depth()).toEqual(0);
    });

    it("should return the depth of tree", function() {
      tree.add(1);
      tree.add(2);
      expect(tree.depth()).toEqual(2);
    });

    //      05
    //  02      12
    //      09      21
    //          19      25
    it("should return the max depth of tree", function() {
      tree.add(5);
      tree.add(2);
      tree.add(12);
      tree.add(9);
      tree.add(21);
      tree.add(19);
      tree.add(25);

      expect(tree.depth()).toEqual(4);
    });

  });

});
