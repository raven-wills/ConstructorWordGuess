var Letter = require("./Letter.js");

var Word = function(stringWord) {
  this.letterArray = [];

  this.addLetter = function(char) {
    var newChar = new Letter(char);
    this.letterArray.push(newChar);
  };

  this.toString = function() {
    var result = "";
    this.letterArray.forEach(function(letter) {
      result += letter.toString();
    });
    return result;
  };

  this.checkForLetter = function(char) {
    this.letterArray.forEach(function(letter) {
      letter.check(char);
    });
    return this.toString().includes(char);
  };

  stringWord.split("").forEach(letter => this.addLetter(letter));
};

module.exports = Word;

// An array of new Letter objects representing the letters of the underlying word

// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.

// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
