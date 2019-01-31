/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,gamPlaying, winScore

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if(gamePlaying) {
    winScore = parseInt(document.getElementById('winning-score').value);
    document.querySelector('#dice-0').style.display = 'inline';
    document.querySelector('#dice-1').style.display = 'inline';
    var randomNum = Math.floor(Math.random() * 6) + 1;
    var randomNum2 = Math.floor(Math.random() * 6) + 1;
    // Change dice picture
    document.querySelector("#dice-0").src = "dice-" + randomNum + ".png";
    document.querySelector("#dice-1").src = "dice-" + randomNum2 + ".png";
    if (randomNum === 1 || randomNum2 === 1) {
      nextPlayer();
    } else if(randomNum === 6 && randomNum2 === 6) {
        roundScore = 0;
        scores[activePlayer] = 0;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
      } else {
        roundScore += randomNum + randomNum2;
        document.getElementById('current-' + activePlayer).textContent = roundScore;

    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if(gamePlaying) {
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] >= winScore) {
      // show Winner
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.getElementById("name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      gamePlaying = false;
    } else {
      nextPlayer();
    }

  }
});

document.querySelector(".btn-new").addEventListener("click", function() {
    document.getElementById("name-" + activePlayer).textContent = "Player " + (activePlayer + 1);
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
  init();

});


function init() {
  document.getElementById('winning-score').value = "";
  gamePlaying = true;
  activePlayer = 0;
  scores = [0,0];
  roundScore = 0;
  document.querySelector('#dice-0').style.display = 'none';
  document.querySelector('#dice-1').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".player-0-panel").classList.toggle("active");

}


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
