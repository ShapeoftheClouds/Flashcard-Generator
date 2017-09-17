# Flashcard-Generator

A basic flashcard application consisting of an API that allows users to create two types of flashcards.

The first is a basic flashcard which has a front. For example:
"Who was the first president of the United States?"
And a back. For example:
"George Washington"

To use the basic flashcard, follow the below steps:
* Open up git bash.
* Run node BasicCard.js
* Hit enter when it shows create.
* Enter in your desired flashcard question.
* Enter in the desired flashcard answer.
* At this point, it will prompt you to either create another card, or review the cards you've entered in.

The second flashcard is a Cloze-Deleted flashcard which presents partial text, example:
"... was the first president of the United States."
And the full text when the user requests it, example:
"George Washington was the first president of the United States."

To use the Cloze-Deleted flashcard, follow the below steps:
* Open up git bash.
* Run node ClozeCard.js
* Hit enter when it shows create. Enter in a flashcard statement, example:
Foggy is Matt Murdock's best friend.
* Enter in the word you'd like to guess from the previous statement, example:
Foggy
* At this point, it will prompt you to either create another card, or review the cards you've entered in.
