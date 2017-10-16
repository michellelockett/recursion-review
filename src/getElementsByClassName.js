// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
// return document.getElementsByClassName(className);
// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var results = [];
  //helper function to find the matching class name
  var checkClassName = function(node) {
    if (node.classList) {
      return node.classList.contains(className);
    }
    return false;
  };
  //the recursive function
  var findElements = function(nodes) {
    //go through all the items in the collection
    //if checkClassName is true, push the node to results
    Array.prototype.forEach.call(nodes, function(node) {
      if (checkClassName(node)) {
        results.push(node);
      }
      if (node.childNodes) {
        findElements(node.childNodes);
      }
    });
  };

  findElements(document.childNodes);
  return results;
};
