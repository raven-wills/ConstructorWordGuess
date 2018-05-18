var Word = require("./Word.js");
var inquirer = require("inquirer");
var words = require("./words.js");
const chalkAnimation = require("chalk-animation");
// Import the word list

var Game = function() {
  this.currentWord = "";

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
            // inquirer
            //   .prompt([
            //     {
            //       name: "confirm",
            //       type: "confirm",
            //       message: "You guessed all the words! Want to play again?"
            //     }
            //   ])
            //   .then(function(noYes) {
            //     if (noYes.confirm) {
            //       console.log("That's cool");
            //     } else {
            //       console.log("Okay! Goodbye!");
            //     }
            //   });
            that.currentWord = that.wordPicker();
            if (that.currentWord === null) {
              console.log("You did it! Game over.");
              inquirer
                .prompt([
                  {
                    name: "confirm",
                    type: "confirm",
                    message: "You guessed all the words! Want to play again?"
                  }
                ])
                .then(function(noYes) {
                  if (noYes.confirm) {
                    console.log("That's cool");
                  } else {
                    console.log("Okay! Goodbye!");
                  }
                });
            }
          }
        } else {
          console.log("Well, fine then");
        }
      });
  };

  this.displayWordPrompt = async function() {
    var that = this;
    while (that.currentWord.toString().indexOf("_") !== -1) {
      await inquirer
        .prompt([
          {
            name: "input",
            type: "input",
            message: "Choose a letter"
          }
        ])
        .then(function(letterPrompt) {
          console.log("Correct!");
          that.currentWord.checkForLetter(letterPrompt.input);
          console.log(that.currentWord.toString());
        });
    }
  };

  this.wordsGuessed = [];

  this.wordPicker = function() {
    var that = this;
    var remainingWords = words.filter(function(word) {
      return !that.wordsGuessed.includes(word);
    });

    console.log(remainingWords);

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
