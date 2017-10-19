// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // traverse string -- move to next char in json
  var index = 0;
  var getChar = function() {
    return json[index];
  };
  var nextChar = function() {
    if (json[index + 1]) {
      index ++;
    } else if (getChar() !== "}" && getChar() !== "]") {
      throw new SyntaxError;
    }
  };
  //helper function to deal with both types of escape characters
  var escapeChar = function() {
    //current getChar() === \
    if ('rtn'.includes(json[index + 1])) {
      nextChar();
      nextChar();
    } else {
      nextChar();
    }
  };
  //helper function to skip all white spaces, commas and colons
  var scrub = function() {
    while ('\t\r\n ,:'.includes(getChar())) {
      nextChar();
    }
  };

  // helper func for objects
  var buildObj = function() {
    //when we enter this function, getChar() === '{'
    var returnObj = {};
    nextChar();
    //iterate through key/value pairs
    while (getChar() !== '}') {
      var key = parser();
      //move over the colon and/or white space
      scrub();
      returnObj[key] = parser();
      scrub();
    }
    nextChar();
    return returnObj;
  };

  // helper func for arrays
  var buildArray = function() {
    var arr = [];
    // at the time func starts is '['
    nextChar();
    // check to see if getChar() === ']'
    if (getChar() !== ']') {
      while (getChar() !== ']') {
        scrub();
        if (getChar() !== ']') {
          arr.push(parser());
        }
      }
    }
    nextChar();
    return arr;
  };

  // helper func for strings
  var buildStr = function() {
    // at time func starts getChar() === '"'
    var str = '';
    nextChar();
    while (getChar() !== '"') {
      if (getChar() === '\\') {
        escapeChar();
        if (getChar() === '\\') {
          str += getChar();
          nextChar();
        }
        if (getChar() === '"') {
          if (json[index + 1] === "]" || json[index + 1] === "}") {
            throw new SyntaxError;
          }
          str += getChar();
          nextChar();
        }
        continue;
      }
      str += getChar();
      nextChar();
    }
    // call nextChar() one more time so we exit string in parser
    nextChar();
    return str;
  };

  // helper func for bools
  var bools = function() {
    var returnVal = getChar();
    //will be called when getChar returns 't' or 'f'
    do {
      nextChar();
    } while (getChar() !== 'e');
    //get out of the boolean
    nextChar();
    return returnVal === 't' ? true : false;
  };


  // helper func for null
  var nully = function() {
    do {
      nextChar();
    } while (getChar() !== 'l');
    //get out of the null
    nextChar();
    nextChar();
    return null;
  };

  // helper func for nums
  var numbers = function() {
    var numStr = '';
    //be called when the parser encounters 0-9 or -
    do {
      numStr += getChar();
      nextChar();
    } while ('0123456790-.'.includes(getChar()));
    return parseFloat(numStr);
  };

  // primary parsing function
  var parser = function() {
    scrub();
    var currentChar = getChar();

    if (currentChar === '{') {
      return buildObj();
    } else if (currentChar === '[') {
      return buildArray();
    } else if (currentChar === 't' || currentChar === 'f') {
      return bools();
    } else if (currentChar === 'n') {
      return nully();
    } else if (currentChar === '"') {
      return buildStr();
    } else if ('-0123456789'.includes(currentChar)) {
      return numbers();
    } else {
      return 'something went haywire! with char: ' + currentChar;
    }
  };
  return parser();
};
