
// Node module exporting a constructor.
module.exports = flashCard;
// Require the inquirer npm
var inquirer = require("inquirer");
// Require the fs npm
var fs = require("fs");
// the cards.txt file
var allCards = ("./cards.txt");
// Create an array that new flash cards are pushed into
var newCardArray = [];
var currentQuestion = 0; 

// prompts the user to create or review flashcards
inquirer.prompt ({
		name: "flashcard",
		type: "list",
		message: "Please create some flashcards.",
		choices: ["CREATE"]
	})
.then(function(response){
	// If the response is create, the run the createFlashCard function
		createFlashCards();
})

// A Constructor accepting two arguments, front and back.
function flashCard(front, back){
	this.front = front; 
	this.back = back;
};

// Function to create new flashcards.
function createFlashCards() {
	// Prompts the user to write a question and answer.
	inquirer.prompt ([
	{
		name: "frontcard",
		type: "input",
		message: "Type in flashcard question: "
	}, 
	{
		name: "backcard",
		type: "input",
		message: "Type in flashcard answer: "
	}
	])
	.then(function(newCard){
		console.log("Creating a new card!");
		// Pushes the users input into a new card.
		newCardArray.push(new flashCard(newCard.frontcard, newCard.backcard));
		// Appends the new flash card to the text file.
		fs.appendFile('./cards.txt', JSON.stringify(newCardArray), function(error) {
			if (error) {
				console.log('Error:- ' + error);
				throw error;
			}
		});
		next();
	});
};

// Function to review already created flashcards.
function reviewFlashCards() {
	inquirer.prompt ({
		name: "guess", 
		type: "input",
		message: newCardArray[currentQuestion].front
	}).then(function(response){
		if (response.guess.toLowerCase() === newCardArray[currentQuestion].back.toLowerCase()) {
			console.log(newCardArray[currentQuestion].back + " is the correct answer!");
		} else {
			console.log("Try again! " + newCardArray[currentQuestion].back + " was the correct answer.");
		}

		if (currentQuestion < newCardArray.length - 1) {
			currentQuestion++; 
			reviewFlashCards();
		} else {
			console.log("Good job!");
		}
	})
};

function next() {
	inquirer.prompt ({
		name: "next",
		type: "list",
		message: "Would you like to [CREATE] flashcards or [REVIEW] flashcards?",
		choices: ["CREATE", "REVIEW"]
	})
	.then(function(response){
	// If the response is create, the run the createFlashCard function
	if (response.next.toUpperCase() === "CREATE") {
		createFlashCards();
	} else {
		// If the response is not create, run the reviewFlashCard function
		reviewFlashCards();
	}
})
};
