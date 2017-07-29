var fs = require("fs");
var inquirer = require("inquirer");
var newCardArray = [];

// The constructor should accept two arguments: text and cloze.
var ClozeCard = function(text, cloze) {
	// Close stuff goes here.
	this.text = text;
	this.cloze = cloze;
}

inquirer.prompt ({
	name: "flashcard",
	type: "list", 
	message: "Would you like to [CREATE] flashcards or [REVIEW] flashcards?",
	choices: ["CREATE", "REVIEW"]
})
.then(function(response){
	if (response.flashcard.toUpperCase() === "CREATE") {
		console.log("Create a flashcard!");
		createFlashCards();
	}
});

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
	.then(function(response){
		console.log("Creating a new card!")
		newCardArray.push(new ClozeCard(response.frontcard, response.backcard));
		fs.appendFile("./cards.txt", ", " + newCardArray, function(err) {
			if(err) {
				return console.log(err);
			}
		});
		console.log(newCardArray);
	});
}

var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States.\
var partial = firstPresidentCloze.text.split("George Washington ").pop();
console.log(partial);

// "George Washington was the first president of the United States.
console.log(firstPresidentCloze.text);

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze = new ClozeCard("This doesn't work", "oops");
// The constructed object should have a cloze property that contains only the cloze-deleted portion of the text.
// The constructed object should have a partial property that contains only the partial text.
// The constructed object should have a fullText property that contains only the full text.
// The constructor should throw or log an error when the cloze deletion does not appear in the input text.
// Use prototypes to attach these methods, wherever possible.
module.exports = ClozeCard;