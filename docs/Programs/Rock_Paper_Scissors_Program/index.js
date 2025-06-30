// Rock Paper Scissors Program

const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice){

    const computerChoice = choices[Math.floor(Math.random() * 3)]
    //computer choice is a random number from 1-3 and rounded to nearest whole number
    console.log(computerChoice);
    let result = "";
    
    if (playerChoice === computerChoice){
        result = "IT'S A TIE!";
    } else {
        switch(playerChoice){
            case "rock": //If player choice is rock
                result = (computerChoice === "scissors") ? "YOU WIN!" : "YOU LOSE!"; 
                //and computer choice is scissors, you win, else the computer picked paper so you lose
                break;
            case "paper": //If player choice is paper
                result = (computerChoice === "rock") ? "YOU WIN!" : "YOU LOSE!"; 
                //and computer choice is rock, you win, else the computer picked scissors so you lose
                break;
            case "scissors": //If player choice is scissors
                result = (computerChoice === "paper") ? "YOU WIN!" : "YOU LOSE!"; 
                //and computer choice is paper, you win, else the computer picked rock so you lose
                break;
        }

    }
    playerDisplay.textContent = `PLAYER: ${playerChoice}`;
    computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
    resultDisplay.textContent = result;

    resultDisplay.classList.remove("greenText", "redText");
    //before it adds a class it removes both of the previous ones

    switch(result){
        case "YOU WIN!":
            resultDisplay.classList.add("greenText");
            playerScore++; //increments player score on win and updates
            playerScoreDisplay.textContent = playerScore;
            break;
        case "YOU LOSE!":
            resultDisplay.classList.add("redText");
            computerScore++; //increments computer score on loss and updates
            computerScoreDisplay.textContent = computerScore;
            break;
    }
}
