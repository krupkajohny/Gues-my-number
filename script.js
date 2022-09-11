'use strict';

/* SELECTING HTML ELEMENTS */
const textMessageEl = document.querySelector('.message');
const scoreValue = document.querySelector('.score');
const checkButtonEl = document.querySelector('.check');
const body = document.querySelector('body');
const highScoreEl = document.querySelector('.highscore');
const againButtonEl = document.querySelector('.again');
const secretNumberEl = document.querySelector('.number');
const guessInputEl = document.querySelector('.guess');

/* ELEMENT STATES AND PARAMETERS  */
const colorRed = 'red';
const colorGreen = 'green';
const colorGrey = '#222';
const cssVisible = 'block';
const cssNonVisible = 'none';

/* TEXT CONTENTS  */
const startGuessingText = `Start guessing...`;
const notNumberText = `⛔️ Not a number...`;
const lowNumberText = `👇🏻 Too Low...`;
const highNumberText = `👆🏻 Too High...`;
const gameWinText = `🍾 Good guess!`;
const gameOverText = `🖕🏻 Game over`;

/* GENERATING RANDOM NUMBER 1-20  */
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);

/* PROGRAM DATA */
let score = 20;
let totalScore = Number(highScoreEl.textContent);
totalScore = 0;

/* FUNCTIONS  */
function displayMessage(message) {
  textMessageEl.textContent = message;
}

function themeChanger(bodyColor, textContet) {
  displayMessage(textContet);
  body.style.backgroundColor = bodyColor;
}

function gameOver() {
  themeChanger(colorRed, gameOverText);
  checkButtonEl.style.display = 'none';
}

/* CLICKING THE CHECK! BUTTON */
checkButtonEl.addEventListener('click', function () {
  const guess = Number(guessInputEl.value);
  console.log(secretNumber);

  if (score !== 0) {
    /* GUESS IS NOT A NUMBER */
    if (!guess) {
      displayMessage(notNumberText);

      /* WHEN GUESS IS WRONG */
    } else if (guess !== secretNumber) {
      displayMessage(guess < secretNumber ? lowNumberText : highNumberText);
      score--;
      scoreValue.textContent = score;
      if (score === 0) {
        gameOver();
      }
    } else if (guess === secretNumber) {
      /* IF GUESS IS RIGHT */
      checkButtonEl.style.display = 'none';
      themeChanger(colorGreen, gameWinText);
      secretNumberEl.textContent = secretNumber;

      /* CHECKING HIGHEST SCORE */
      if (totalScore < score) {
        totalScore = score;
        highScoreEl.textContent = totalScore;
      }
    }
  }
});

/* Reseting game (the best score stays) */
againButtonEl.addEventListener('click', function () {
  checkButtonEl.style.removeProperty('display');
  themeChanger(colorGrey, startGuessingText);
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  scoreValue.textContent = score;
  secretNumberEl.textContent = `?`;
  guessInputEl.value = '';
});
