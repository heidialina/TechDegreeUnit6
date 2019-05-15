// Get the element with the ID of qwerty and save it to a variable.
// Get the element with the ID of phrase and save it to a variable.
// Create a missed variable, initialized to 0.

const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
const tries = document.getElementsByClassName('tries');
const phraseUl = phrase.querySelector('ul');
let missed = 0; 

// Create a phrases array that contains at least 5 different phrases as strings.

const phrases = [
	'one can never have enough socks',
	'until the very end',
	'i solemnly swear that i am up to no good',
	'worrying means you suffer twice',
	'what exactly is the function of a rubber duck'
];

// Attach a event listener to the “Start Game” button to hide the start screen overlay.

const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');

startGame.addEventListener('mouseover', () => {
	startGame.style.cursor = 'pointer';
});

// Create a getRandomPhraseAsArray function.

const getRandomPhraseAsArray = (arr) => {
	let randomArr = Math.floor(Math.random() * arr.length);
	let randomPhrase = arr[randomArr];
	return randomPhrase.split('');
};

getRandomPhraseAsArray(phrases);

// 1. Create an addPhraseToDisplay function that loops through an array of characters.
// 2a. Inside the loop, for each character in the array, you’ll create a list item. 
// 2b. Put the character inside of the list item.
// 2c. And append that list item to the #phrase ul in your HTML.
// If the character in the array is a letter and not a space, the function should add the class “letter” to the list item.

const addPhraseToDisplay = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		let letter = document.createElement('li');
		letter.innerHTML = arr[i];
		phrase.appendChild(letter);
		if (arr[i] !== ' ') {
				letter.className = 'letter';
			} else {
				letter.className = 'space';
			}
	}
};

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Create a checkLetter function.

const letters = document.querySelectorAll('.letter');

const checkLetter = (clicked) => {
	let match = null; 
	for (let i = 0; i < letters.length; i++) {
		if (letters[i].textContent == clicked.textContent) {
			letters[i].classList.add('show');
			letters[i].style.transition = '1.3s'; 
			match = true;
			}
	}
	return match; 
};

// Add an event listener to the keyboard. ONLY BUTTON! Make chosen class. 
// Pass the button to the checkLetter function, and store the letter returned inside of a variable called letterFound.


qwerty.addEventListener('click', (event) => {
	if (event.target.tagName === 'BUTTON') {
		event.target.className = 'chosen';
		event.target.disabled = true;
		const letterFound = checkLetter(event.target);
		if (letterFound === null) {
			missed += 1;
			tries[tries.length - missed].firstChild.src = 'images/lostHeart.png';
			}	
		}
	checkWin();
});

// Create a checkWin function.
//Each time the player guesses a letter, this function will check whether the game has been won or lost. At the very end of the keyboard event listener, you’ll run this function to check if the number of letters with class “show” is equal to the number of letters with class “letters”. If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.

const shown = document.getElementsByClassName('show');

const checkWin = () => {
	if (letters.length === shown.length) {
		overlay.style.display = 'flex';
		overlay.className = 'win';
		startGame.textContent = 'Go again?'
		} else if (missed >= 5) {
			overlay.style.display = 'flex';
			overlay.className = 'lose';
			startGame.textContent = 'Try again?';
	}
};

// reset game

startGame.addEventListener('click', () => {
	missed = 0;
	for (let i = 0; i < tries.length; i += 1) {
		tries[i].firstChild.src = 'images/liveHeart.png';
	}
	const buttons = qwerty.getElementsByTagName('button');
	for (let i = 0; i < buttons.length; i += 1) {
		buttons[i].className = '';
		buttons[i].disabled = false;
	}
	overlay.style.display = 'none';
	phraseUl.innerHTML = ' ';
	const phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray); 

});