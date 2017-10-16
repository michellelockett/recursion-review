// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // checks for type of obj
  var objType = typeof obj;

  // handler function for arrays
  var stringifyArr = function(arr) {
    // check to see if array is empty
    // if it is return '[]'
    if (arr.length === 0) {
      return '[]';
    }
    // declare var to track string to return at end
    var str = '[';
    // iterate through arr
    arr.forEach(function(value, index) {
      // add result of stringify on item to our string
      // add a comma to string
      str += stringifyJSON(value);
      if (index < arr.length - 1) {
        str += ',';
      }
    });
    // add a closing bracked
    str += ']';
    // return str
    return str;
  };

  // handler function for objects
  var stringifyObj = function(object) {
    // check to see if object is empty
    // if it is, return '{}'
    if (Object.keys(object).length === 0) {
      return '{}';
    }
    var str = '{';
    // iterate through object
    for (var key in object) {
      if (typeof object[key] !== 'function' && typeof object[key] !== 'undefined') {
        if (str !== '{') {
          str += ',';
        }
        str += stringifyJSON(key);
        str += ':';
        str += stringifyJSON(object[key]);
      }
    }
    str += '}';
    return str;
  };

  // handler cases
  if (obj === null) {
    return 'null';
  }
  if (objType === 'string') {
    return '"' + obj + '"';
  }
  if (objType === 'number') {
    return obj.toString();
  }
  if (objType === 'boolean') {
    if (obj === true) {
      return 'true';
    } else {
      return 'false';
    }
  }
  if (objType === 'undefined' || objType === 'function') {
    return;
  }
  if (Array.isArray(obj)) {
    return stringifyArr(obj);
  }
  if (objType === 'object') {
    return stringifyObj(obj);
  }
};
