var playerScore = 0;
var computerScore = 0;
var gameEnded = false; // Add a flag to track if the game has ended
const playerStars = document.querySelector('.PlayerStars');
const computerStars = document.querySelector('.OpponentStars');
const resetButton = document.getElementById('resetButton');
const choices = ['rock', 'paper', 'scissors'];
const choiceButtons = document.querySelectorAll('.choiceButton'); // Assuming buttons have class 'choiceButton'

function computerPlay() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function emoji(choice) {
    if (choice === 'rock') {
        return '🪨';
    } else if (choice === 'paper') {
        return '📄';
    } else {
        return '✂️';
    }
}

function Winner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 'tie!';
    } else if ((playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')) {
        playerScore++;
        return 'player';
    } else {
        computerScore++;
        return 'opponent';
    }
}

function addstars() {
    playerStars.textContent = ('⭐'.repeat(playerScore));
    computerStars.textContent = ('⭐'.repeat(computerScore));
}
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (gameEnded) {
            alert("The game has ended. Please click the reset button to play again.");
            return;
        }
        const playerSelection = button.dataset.choice;
        const computerSelection = computerPlay();
        const result = Winner(playerSelection, computerSelection);
        document.querySelector('.OpponentChoice').textContent = emoji(computerSelection);
        addstars();

        if (playerScore == 3 || computerScore == 3) {
            endGame();
        }
    });
});

function endGame() {
    gameEnded = true;
    resetButton.style.display = 'block';
    resetButton.addEventListener('click', () => {
        playerScore = 0;
        computerScore = 0;
        gameEnded = false; // Reset the flag when the game is reset
        addstars();
        resetButton.style.display = 'none';
        document.querySelector('.OpponentChoice').textContent = "✔️";
    });
}