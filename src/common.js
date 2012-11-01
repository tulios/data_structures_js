var extend = function(source, destination) {
  var proto = source.prototype;
  for (var property in proto) {
    if (!destination[property]) {
      destination[property] = proto[property];
    }
  }
  return destination;
};
