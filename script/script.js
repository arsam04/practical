// Define the dice values and scores
const diceValues = [1, 2, 3, 4, 5, 6];
const scores = {
  samePair: 2,
  differentPair: 1,
  oneIsOne: 0,
};

// Function to roll a dice and return a random value
function rollDice() {
  return diceValues[Math.floor(Math.random() * diceValues.length)];
}

// Function to calculate the score based on the rolled dice values
function calculateScore(die1, die2) {
  if (die1 === 1 || die2 === 1) {
    return scores.oneIsOne;
  } else if (die1 === die2) {
    return (die1 + die2) * scores.samePair;
  } else {
    return die1 + die2;
  }
}

// Function to update the dice images
function updateDiceImages(selector, die1Value, die2Value) {
  $(selector).eq(0).attr('src', `dice-img/dice-${die1Value}.png`);
  $(selector).eq(1).attr('src', `dice-img/dice-${die2Value}.png`);
}

function showPopup(message) {
  $('#popupMessage').text(message);
  $('#popupContainer').fadeIn();
}

function hidePopup() {
  $('#popupContainer').fadeOut();
}

function resetGame() {
  playerTotalScore = 0;
  computerTotalScore = 0;
  roundNumber = 0; // Start from round 0
  $('#playerScore').text('0');
  $('#computerScore').text('0');
  $('#playerTotal').text('0');
  $('#computerTotal').text('0');
  $('#winnerMessage').text('');
  $('#rollButton').prop('disabled', false);
}

// Moved the declarations outside the $(document).ready() function
let playerTotalScore = 0;
let computerTotalScore = 0;
let roundNumber = 0;

$(document).ready(function () {
  $('#rollButton').on('click', function () {
    hidePopup(); // Close any previous popup

    if (roundNumber < 3) {
      // Player's turn
      const playerDie1 = rollDice();
      const playerDie2 = rollDice();
      const playerRoundScore = calculateScore(playerDie1, playerDie2);

      updateDiceImages('.player .die', playerDie1, playerDie2);
      $('#playerScore').text(playerRoundScore);

      playerTotalScore += playerRoundScore;
      $('#playerTotal').text(playerTotalScore);

      // Computer's turn
      const computerDie1 = rollDice();
      const computerDie2 = rollDice();
      const computerRoundScore = calculateScore(computerDie1, computerDie2);

      updateDiceImages('.computer .die', computerDie1, computerDie2);
      $('#computerScore').text(computerRoundScore);

      computerTotalScore += computerRoundScore;
      $('#computerTotal').text(computerTotalScore);

      roundNumber++;
    }

    if (roundNumber >= 3) {
      // Determine the winner
      let winnerMessage = '';
      if (playerTotalScore > computerTotalScore) {
        winnerMessage = 'You win!';
        showPopup('Congratulations! You win!');
      } else if (playerTotalScore < computerTotalScore) {
        winnerMessage = 'Computer wins!';
        showPopup('You lose! Try again.');
      } else {
        winnerMessage = 'It\'s a tie!';
        showPopup('It\'s a tie! Try again.');
        // No popup for a tie, but you can add one if you wish.
      }

      // Update the winnerMessage display
      $('#winnerMessage').text(winnerMessage);
      $('#rollButton').prop('disabled', true);
    }
  });

  $('#closePopupButton').on('click', function () {
    hidePopup();
    resetGame();
  });

  // Start the game on page load
  resetGame();
});