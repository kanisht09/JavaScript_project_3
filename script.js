"use  strict";

// selecting elements
const score0EL = document.querySelector("#score--0");
// another way of selecting ids
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

score0EL.textContent = 0;
score1EL.textContent = 0;
// even after setting 0 as integer i get string becuase of JS converts it into string while displaying it
// checking the type
// console.log(typeof score0EL.textContent);

// console.log(score0EL, score1EL);

// My implementation :

// const diceEL = document.querySelector(".dice");
// // console.log(diceEL);
// diceEL.classList.add("hidden");

// const btnNew = document.querySelector(".btn--new");
// const btnRoll = document.querySelector(".btn--roll");
// const btnHold = document.querySelector(".btn--hold");

// // console.log(btnRoll);
// let currentScore = 0;
// let f = 0;
// btnRoll.addEventListener("click", function () {
//   //console.log("this button was clicked");
//   const dice = Math.trunc(Math.random() * 6) + 1;
//   diceEL.classList.remove("hidden");
//   diceEL.src = `dice-${dice}.png`;
//   //   console.log(typeof dice);

//   if (dice !== 1) {
//     // Add dice to the score
//     currentScore += dice;
//     if (!f) current0EL.textContent = currentScore;
//     else current1EL.textContent = currentScore;
//   } else {
//     currentScore = 0;
//     if (f) {
//       current1EL.textContent = currentScore;
//     } else {
//       current0EL.textContent = currentScore;
//     }
//     f ^= 1;
//   }
// });

// btnHold.addEventListener("click", function () {
//   if (f) {
//     const p = Number(score1EL.textContent);
//     // console.log(typeof p);
//     score1EL.textContent = p + currentScore;
//     currentScore = 0;
//     current1EL.textContent = currentScore;
//   } else {
//     const p = Number(score0EL.textContent);
//     score0EL.textContent = p + currentScore;
//     currentScore = 0;
//     current0EL.textContent = currentScore;
//     // console.log(typeof p);
//   }
//   f ^= 1;
// });

// btnNew.addEventListener("click", function () {
//   currentScore = 0;
//   f = 0;
//   score1EL.textContent = currentScore;
//   score0EL.textContent = currentScore;
//   current1EL.textContent = currentScore;
//   current0EL.textContent = currentScore;
//   diceEL.classList.add("hidden");
// });

const diceEL = document.querySelector(".dice");
// console.log(diceEL);
diceEL.classList.add("hidden");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// console.log(btnRoll);
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer ^= 1;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  //console.log("this button was clicked");
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;
    //   console.log(typeof dice);

    if (dice !== 1) {
      // Add dice to the score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score1EL.textContent = 0;
  score0EL.textContent = 0;
  current1EL.textContent = 0;
  current0EL.textContent = 0;
  if (!diceEL.classList.contains("hidden")) {
    diceEL.classList.add("hidden");
  }
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
};

btnNew.addEventListener("click", init);
