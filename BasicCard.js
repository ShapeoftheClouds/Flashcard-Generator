
// Node module exporting a constructor.
module.exports = flashCard;
// Require the inquirer npm
var inquirer = require("inquirer");
// Require the fs npm
var fs = require("fs");
// Create an array that new flash cards are pushed into
var newCardArray = [];
// prompts the user to create or review flashcards
inquirer.prompt ({
		name: "flashcard",
		type: "list",
		message: "Would you like to [CREATE] flashcards or [REVIEW] flashcards?",
		choices: ["CREATE", "REVIEW"]
	})
.then(function(response){
	// If the response is create, the run the createFlashCard function
	if (response.flashcard.toUpperCase() === "CREATE") {
		console.log("You've created a flashcard!");
		createFlashCards();
	} else {
		// If the response is not create, run the reviewFlashCard function
		console.log("You're reviewing flashcards!");
		reviewFlashCards();
	}
})

// A Constructor accepting two arguments, front and back.
function flashCard(front, back){
	this.front = front; 
	this.back = back;
};

// Creating a basic flashcard for testing purposes
var firstPresident = new flashCard(
	"Who was the first president of the United States?", "George Washington");

// Function to create new flashcards.
function createFlashCards() {
	// Prompts the user to write a question an answer.
	inquirer.prompt ([
	{
		name: "frontcard",
		type: "input",
		message: "Type in flashcard question"
	}, 
	{
		name: "backcard",
		type: "input",
		message: "Type in flashcard answer"
	}
	])
	.then(function(newCard){
		console.log("Creating a new card!");
		// Pushes the users input into a new card.
		newCardArray.push(new flashCard(newCard.frontcard, newCard.backcard));
		// Appends the new flash card to the text file.
		fs.appendFile("./cards.txt" + newCardArray, function(err) {
			if(err) {
				return console.log(err);
			}
		});
	});
};

// Function to review already created flashcards.
function reviewFlashCards() {
	inquirer.prompt ({
		name: "president", 
		type: "input",
		message: firstPresident.front,
	}).then(function(response){
		if (response.president === "George Washington") {
			console.log("Correct! " + firstPresident.back + " was the first President of the U. S. A.");
		} else {
			console.log("Try again! " + firstPresident.back + " was the first President of the U. S. A.");
		}
	})
};

	// constructor should have a property for the front of the card containing the text.
	// constructor should have a property for the back of the card containing the text.


// The constructed object should have a front property that contains the text on the front of the card.
// The constructed object should have a back property that contains the text on the back of the card.