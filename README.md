# Data Structures JS

Data structures written in javascript

# Structures

## LinkedList

````javascript
new LinkedList();
````

### Methods

* add
* addAll
* addFirst
* addLast
* get
* getFirst
* getLast
* remove
* contains
* size
* isEmpty
* toArray
* clear

## BinaryTree 

````javascript
new BinaryTree();
````

````javascript
var comparator = new BinaryTree.Comparator(function(v1, v2) {
  return v1 === 1 ? 0 : -1;
});

new BinaryTree(comparator);
````

### Methods

* add
* remove
* contains
* size
* isEmpty
* depth
* inOrderEach
* preOrderEach
* postOrderEach
* toArray | toArray("preOrder") | toArray("postOrder")
