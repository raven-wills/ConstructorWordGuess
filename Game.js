var Word = require("./Word.js");
var inquirer = require("inquirer");
var words = require("./words.js");
const chalkAnimation = require("chalk-animation");
// Import the word list

var Game = function() {
  this.currentWord = "";
  this.numberOfGuesses = 10;
  // play: starts the game track the guesses var guesses
  this.play = function() {
    var that = this;
    inquirer
      .prompt([
        {
          name: "confirm",
          type: "confirm",
          message: "Are you ready to play?"
        }
      ])
      .then(async function(yesNo) {
        if (yesNo.confirm) {
          that.currentWord = that.wordPicker();
          while (that.currentWord !== null) {
            await that.displayWordPrompt();
            that.currentWord = that.wordPicker();
            if (that.currentWord === null || this.numberOfGuesses === 0) {
              console.log("Game over.");
            }
          }
        } else {
          console.log("Well, fine then");
        }
      });
  };

  this.displayWordPrompt = async function() {
    var that = this;

    while (
      that.currentWord.toString().indexOf("_") !== -1 &&
      that.numberOfGuesses > 0
    ) {
      await inquirer
        .prompt([
          {
            name: "input",
            type: "input",
            message: "Choose a letter"
          }
        ])
        .then(function(letterPrompt) {
          if (that.currentWord.checkForLetter(letterPrompt.input)) {
            console.log("Correct!");
            console.log(that.currentWord.toString());
          } else {
            that.numberOfGuesses--;
            if (that.numberOfGuesses > 0) {
              console.log(
                "Sorry, that's wrong. Guesses remaining: " +
                  that.numberOfGuesses
              );
              console.log(that.currentWord.toString());
            } else {
              console.log("You tried your best");
            }
          }
        });
    }
  };

  this.wordsGuessed = [];

  this.wordPicker = function() {
    var that = this;
    var remainingWords = words.filter(function(word) {
      return !that.wordsGuessed.includes(word);
    });

    if (remainingWords.length === 0) {
      return null;
    }
    const index = Math.floor(Math.random() * remainingWords.length);
    that.wordsGuessed.push(remainingWords[index]);

    const word = new Word(remainingWords[index]);
    console.log(word.toString());
    // const glitch = chalkAnimation.glitch(word.toString());
    // setTimeout(() => {
    //   glitch.stop();
    //   console.clear();
    //   console.log(word.toString());
    // }, 1000);
    return word;
  };
  //  take a guess: tells the user to take a guess guesses--
};

var gameOne = new Game();
gameOne.play();
// console.log(gameOne.wordsGuessed[0]);
// word.checkForLetter("s" /*user input*/);
// word.checkForLetter("t");
// word.checkForLetter("p");
