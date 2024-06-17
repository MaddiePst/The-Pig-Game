'use strict';
// Selecting elements
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const curr1El= document.getElementById('current--0');
const curr2El= document.getElementById('current--1');
const player1 =document.querySelector('.player--0');
const player2 =document.querySelector('.player--1');

// Starting conditions
let playing;
let activePlayer;
let currentScore;
let scores;

const initialState = function(){
  scores=[0,0];
  currentScore = 0;
  activePlayer=0;
  playing= true;
  score1El.textContent =0;
  score2El.textContent =0;
  diceEl.classList.add('hidden');
  player1.classList.add('player--active')
  player2.classList.remove('player--active');

}
initialState();







const switchPlayer= function(){
  document.getElementById(`current--${activePlayer}`).textContent= 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1:0; 
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

// Rolling Dice
btnRoll.addEventListener('click',function(){
  if(playing){
    // 1.Generate a random dice roll
    const dice =Math.trunc(Math.random()*6)+1;
    
    // 2.display dice'
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    
    // 3.Check for rolled 1: if true, switch to next player
    if(dice !== 1){
      // Add dice to the current score
      currentScore +=dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else{
      // Switch the user
      switchPlayer();
      
    }
  }
  });
// Hold Button
btnHold.addEventListener('click', function(){
  if(playing){
  // 1. Add current score to the active player
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
 
  // 2.Check if the score is >=100
  if(scores[activePlayer] >= 100){
    playing =false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  }
  // 3.Switch Player
  switchPlayer();
}
});

// New Game Button
btnNew.addEventListener('click', function(){
  player1.classList.remove('player--winner'); 
  player2.classList.remove('player--winner'); 
  initialState();
})