
// Node module exporting a constructor.
module.exports = flashCard;
var inquirer = require("inquirer");
var fs = require("fs");
var userInput = process.argv[2];
var newCardArray = [];

inquirer.prompt ({
		name: "flashcard",
		type: "list",
		message: "Would you like to [CREATE] flashcards or [REVIEW] flashcards?",
		choices: ["CREATE", "REVIEW"]
	})
.then(function(response){
	if (response.flashcard.toUpperCase() === "CREATE") {
		console.log("You've created a flashcard!");
		createFlashCards();
	} else {
		console.log("You're reviewing flashcards!");
		reviewFlashCards();
	}
})


// The constructor should accept two arguments: front and back.
// Constructor accepting two arguments, front and back.
function flashCard(front, back){
	this.front = front; 
	this.back = back;

};

var firstPresident = new flashCard("Who was the first president of the United States?", "George Washington");

	// console.log(firstPresident.back);

// Function to create new flashcards.
function createFlashCards() {
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
		console.log("Creating a new card!")
		newCardArray.push(new flashCard(newCard.frontcard, newCard.backcard));
		fs.appendFile("./cards.js" + newCardArray, function(err) {
			if(err) {
				return console.log(err);
			}
		});
		console.log(newCardArray);
		reviewFlashCards();
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