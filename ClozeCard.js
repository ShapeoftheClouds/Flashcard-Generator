// Requiring the fs npm
var fs = require("fs");
// Requiring the inquirer npm
var inquirer = require("inquirer");
// card array
var cardArray = [];
// Starts the questions at 0
var currentQuestion = 0;
// Prompts the user to create a flashcard.
inquirer.prompt ({
	name: "flashcard",
	type: "list", 
	message: "Please [CREATE] a flashcard.",
	choices: ["CREATE"]
})
.then(function(response){
	createFlashCards();
});

// Cloze constructor accepting two arguments: text and cloze.
var ClozeCard = function(text, cloze) {
	this.text = text;
	this.cloze = cloze;
};

// Function for creating a cloze card.
function createFlashCards() {
	inquirer.prompt ([
	{
		name: "statement",
		type: "input",
		message: "Type in flashcard statement: "
	} , 
	{
		name: "answer",
		type: "input",
		message: "Type in flashcard answer: "
	}
	])
	.then(function(newCard){
		// Pushes the user's card information to the card array
		cardArray.push(new ClozeCard(newCard.statement, newCard.answer));
		// Appends the user's card information to the test file
		fs.appendFile('./clozecards.txt', JSON.stringify(cardArray), function(err) {
			if(err) {
				return console.log(err);
			}
			// Gives the user the option to create more cards, or review created cards
			next();
		});
	});
};

// Function for reviewing cards
function reviewFlashCards() {
	inquirer.prompt ({
		name: "guess", 
		type: "input",
		// Removes the cloze information from the card statement
		message: cardArray[currentQuestion].text.replace(cardArray[currentQuestion].cloze, '...')
	}).then(function(response){
		if (response.guess.toLowerCase() === cardArray[currentQuestion].cloze.toLowerCase()) {
			console.log(cardArray[currentQuestion].cloze + " is the correct answer!");
		} else {
			console.log("Try again! " + cardArray[currentQuestion].cloze + " was the correct answer.");
		}

		if (currentQuestion < cardArray.length - 1) {
			currentQuestion++; 
			reviewFlashCards();
		} else {
			console.log("You've reviewed all the cards! Good job!");
		}
	})
};
// Prompts the user to either create new cards, or review already created cards.
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