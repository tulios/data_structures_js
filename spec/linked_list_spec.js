describe("LinkedList", function() {
  var list = null;
  beforeEach(function() {
    list = new LinkedList();
  });

  describe("#addLast", function() {

    it("should append the specified element to the end of the list", function() {
      expect(list.isEmpty()).toEqual(true);
      list.addLast({name: "name 1", value: 1});
      list.addLast({name: "name 2", value: 2});
      expect(list.size()).toEqual(2);
      expect(list.getFirst().data.value).toEqual(1);
      expect(list.getLast().data.value).toEqual(2);
    });

  });

  describe("#addFirst", function() {

    it("should unsert the specified element at the beginning of the list", function() {
      expect(list.isEmpty()).toEqual(true);
      list.addFirst({name: "name 1", value: 1});
      list.addFirst({name: "name 2", value: 2});
      expect(list.size()).toEqual(2);
      expect(list.getFirst().data.value).toEqual(2);
      expect(list.getLast().data.value).toEqual(1);
    });

  });

  describe("#add", function() {

    beforeEach(function() {
      expect(list.isEmpty()).toEqual(true);
      list.addLast({name: "name 1", value: 1});
      list.addLast({name: "name 2", value: 2});
    });

    it("should inserts the specified element at the specified position in the list", function() {
      list.add({name: "name 3", value: 3}, 1); // random position

      expect(list.size()).toEqual(3);
      expect(list.get(0).data.value).toEqual(1);
      expect(list.get(1).data.value).toEqual(3);
      expect(list.get(2).data.value).toEqual(2);
    });

    it("should accepts elements to head", function() {
      list.add({name: "name 3", value: 3}, 0); // first position

      expect(list.size()).toEqual(3);
      expect(list.get(0).data.value).toEqual(3);
      expect(list.get(1).data.value).toEqual(1);
      expect(list.get(2).data.value).toEqual(2);
    });

    it("should accepts elements to tail", function() {
      list.add({name: "name 3", value: 3}, 2); // last position

      expect(list.size()).toEqual(3);
      expect(list.get(0).data.value).toEqual(1);
      expect(list.get(1).data.value).toEqual(2);
      expect(list.get(2).data.value).toEqual(3);
    });

    it("should raise exception if use an index out of range", function() {
      expect(function() { list.add({}, 200); }).toThrow();
    });

  });

  describe("#addAll", function() {

    it("should append all of the elements to the end of the list, in the order that they were inserted", function() {
      expect(list.isEmpty()).toEqual(true);
      list.addAll([5, 4, 3, 2, 1]);
      expect(list.get(0).data).toEqual(5);
      expect(list.get(1).data).toEqual(4);
      expect(list.get(2).data).toEqual(3);
      expect(list.get(3).data).toEqual(2);
      expect(list.get(4).data).toEqual(1);
    });

  });

  describe("#get", function() {

    it("should return 'null' if index out of range", function() {
      expect(list.get(200)).toBeNull();
    });

    it("should return the value of the informed position", function() {
      list.addAll([1, 2, 3]);
      expect(list.get(0).data).toEqual(1);
      expect(list.get(1).data).toEqual(2);
      expect(list.get(2).data).toEqual(3);
    });

  });

  describe("#getFirst", function() {

    it("should return the first element of the list", function() {
      list.addAll([3, 2, 1]);
      expect(list.getFirst().data).toEqual(3);
    });

  });

  describe("#getLast", function() {

    it("should return the last element of the list", function() {
      list.addAll([3, 2, 1]);
      expect(list.getLast().data).toEqual(1);
    });

  });

  describe("#clear", function() {

    it("should clear the list", function() {
      list.addAll([1, 2, 3, 4, 5]);
      expect(list.size()).toEqual(5);
      list.clear();
      expect(list.isEmpty()).toEqual(true);
    });

  });

  describe("#remove", function() {

    beforeEach(function() {
      list.addAll([1, 2, 3, 4]);
      expect(list.size()).toEqual(4);
    });

    it("should raise exception if use an index out of range", function() {
      expect(function() { list.remove(-1); }).toThrow();
      expect(function() { list.remove(4); }).toThrow();
    });

    it("should be able to exclude the head", function() {
      expect(list.remove(0).data).toEqual(1);
      expect(list.size()).toEqual(3);
    });

    it("should be able to exclude the tail", function() {
      expect(list.remove(3).data).toEqual(4);
      expect(list.size()).toEqual(3);
    });

    it("should be able to remove any element", function() {
      expect(list.remove(1).data).toEqual(2);
      expect(list.size()).toEqual(3);
    });

  });

  describe("#contains", function() {

    it("should be able to check if the list contains the informed element", function() {
      list.addAll([1, 2, 3, 4, 5]);
      expect(list.contains(1)).toEqual(true);
      expect(list.contains(14)).toEqual(false);
      expect(list.contains(5)).toEqual(true);
      expect(list.contains("house")).toEqual(false);
      expect(list.contains(3)).toEqual(true);
      expect(list.contains("3")).toEqual(false);
    });

  });

  describe("#toArray", function() {
    var array = null;

    beforeEach(function() {
      array = ["A", "B", "C"];
    });

    it("should convert the list", function() {
      list.addAll(array);
      expect(list.toArray()).toEqual(array);
    });

    it("should return an empty array if the list is empty", function() {
      expect(list.isEmpty()).toEqual(true);
      expect(list.toArray()).toEqual([]);
    });

  });

});
