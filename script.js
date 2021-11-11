// Define general variables
let targetAmount;
let targetArray = [];
let sortedTargetArray = [];
let guessArray = [];
let sortedGuessArray = []
let score;

// Store the html elements into variables
let squares = document.querySelectorAll(".square");
let resetButton = document.querySelector("#reset");
let messageDisplay = document.querySelector("#message");
let scoreDisplay = document.querySelector("#score");

// FUNCTIONS FOR MANIPULATING THE SQUARES =================================================================================================================================

// Define a function to generate an array of random numbers
function createTargetArray(amount) {
	let arr = []
	while (arr.length < amount) {
		randomSquareNumber = Math.floor(Math.random() * 25)
		if (arr.includes(randomSquareNumber)) {
			//pass
		} else {
			arr.push(randomSquareNumber)
		};
	};
	return arr;
};

// Define a function to clear the target from the squares
function clearTarget() {
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = "purple";
	};
};

// Define a function for showing the target
function showTarget() {

	// Reset the level-variables
	targetArray = [];
	guessArray = [];
	clickedSquare = '';
	sortedGuessArray = [];
	sortedTargetArray = [];

	// Create the target array and show it on the squares
	targetArray = createTargetArray(targetAmount);
	for (var i = 0; i < targetArray.length; i++) {
		var elementNumber = targetArray[i];
		squares[elementNumber].style.background = "yellow";
	};

	// Clear the target from the squares
	setTimeout(function(){
		clearTarget(); 
	}, 
	700);
};

// FUNCTIONS FOR IN-GAME ACTIONS =========================================================================================================================================

// Define a function to reset/start the game and add its listener to the button
function resetGame() {

	// Reset the game-variables
	targetAmount = 1;
	score = 0;
	scoreDisplay.textContent = score;
	messageDisplay.textContent = "Pay attention to the yellow squares!";

	// Show the target
	showTarget();
};
resetButton.addEventListener("click", function() {
	resetGame();
});

// Define a function for building up the guess-array and evaluating the user action and add listeners to each square
function evaluateAction (clickedSquare) {
			
	// Build up the guess-array
	guessArray.push(clickedSquare);

	// Evaluate the user action if the length of the guess-array is equal to the length of the target-array
	if (guessArray.length === targetArray.length) {

		// Sort the guess-array and the target-array in order to easily compare them
		var sortedGuessArray = guessArray.sort().join(',');
		var sortedTargetArray = targetArray.sort().join(',');

		// If the guess is correct
		if (sortedGuessArray === sortedTargetArray) {

			// Update the message on the display and the score
			messageDisplay.textContent = "Correct!";
			score += targetAmount;
			scoreDisplay.textContent = score;

			// Rename the reset button and clear the target from the squares
			resetButton.textContent = "Restart";
			clearTarget();
			
			// Increase the target amount and show the target
			targetAmount += 1;
			showTarget();

		// If the guess is not correct
		} else {

			// Rename the reset button and clear the target from the squares
			messageDisplay.textContent = "Try Again";
			clearTarget();
		};
	};
};
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function() {
		this.style.background = "yellow";
		let clickedSquare = this.id
		evaluateAction(clickedSquare)
	});
};

// FUNCTION TRIGGERING ===================================================================================================================================================

resetGame()
