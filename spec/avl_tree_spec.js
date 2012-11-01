describe("AVLTree", function() {
  var tree = null;
  beforeEach(function() {
    tree = new AVLTree();
  });

  describe("#add", function() {

    // 1             2
    //   2    =>  1     3
    //     3
    //
    it("should balance to the left (right rotate)", function() {
      tree.add(1);
      tree.add(2);
      tree.add(3);
      expect(tree.size()).toEqual(3);
      expect(tree._root.left.data).toEqual(1);
      expect(tree._root.data).toEqual(2);
      expect(tree._root.right.data).toEqual(3);
    });

    //     3         2  
    //   2    =>  1     3
    // 1
    it("should balance to the right (left rotate)", function() {
      tree.add(3);
      tree.add(2);
      tree.add(1);
      expect(tree.size()).toEqual(3);
      expect(tree._root.left.data).toEqual(1);
      expect(tree._root.data).toEqual(2);
      expect(tree._root.right.data).toEqual(3);
    });
    
    //  3           4
    //    5  =>  3     5
    //  4
    it("should balance to the left (double rotation)", function() {
      tree.add(3);
      tree.add(5);
      tree.add(4);
      expect(tree.size()).toEqual(3);
      expect(tree._root.left.data).toEqual(3);
      expect(tree._root.data).toEqual(4);
      expect(tree._root.right.data).toEqual(5);
    });

    //     5          4
    //  3      =>  3     5
    //     4
    it("should balance to the right (double rotation)", function() {
      tree.add(5);
      tree.add(3);
      tree.add(4);
      expect(tree.size()).toEqual(3);
      expect(tree._root.left.data).toEqual(3);
      expect(tree._root.data).toEqual(4);
      expect(tree._root.right.data).toEqual(5);
    });

  });

});
