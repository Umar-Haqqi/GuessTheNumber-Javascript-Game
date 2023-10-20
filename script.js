const userInput = document.querySelector('#guessField');
const submit = document.querySelector('#submit');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.LastResult');
const lowOrHi = document.querySelector('.lowOrHigh');
const startOver = document.querySelector('.result');

let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(randomNumber);

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

// whether available to play game or not
if (playGame) {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        // console.log(guess);
        validateGuess(guess);
    })
}

// func to check user input, whether value is between 1-100 or not empty
function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("please enter a valid number")
    }
    else if (guess < 1) {
        alert("please enter a number greater than 1")
    }
    else if (guess > 100) {
        alert("please enter a number less than 100")
    }
    else {
        // add into prev guess array
        prevGuess.push(guess);

        // now check whether game is over or not
        if (numGuess >= 10) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame(); // end the game
        }
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

// check whether guess value is equal, low or high to random value or not
function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed it right, Wow`);
        endGame();
    }
    else if (guess < randomNumber) {
        displayMessage(`Your guessed number is too low`);
    }
    else if (guess > randomNumber) {
        displayMessage(`Your guessed number is too high`);
    }
}

// clean prev values and update guess array and remaining guess
function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

// display a result msg
function displayMessage(message) {
    lowOrHi.innerHTML = `<h3>${message}</h3>`
}

// end the game and start a new game
function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function () {
        randomNumber = parseInt(Math.random() * 100 + 1)
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        lowOrHi.innerHTML = '';
        playGame = true;
    })
}