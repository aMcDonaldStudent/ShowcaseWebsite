const turtle = document.getElementById("turtle");
const obstacle1 = document.getElementById("obstacle1");
const obstacle2 = document.getElementById("obstacle2");
const obstacle3 = document.getElementById("obstacle3");
const obstacle4 = document.getElementById("obstacle4");
const obstacle5 = document.getElementById("obstacle5");
const obstacle6 = document.getElementById("obstacle6");


const blasterContainer = document.createElement("div");
blasterContainer.id = "blaster-container";
document.body.appendChild(blasterContainer);

// Sets up our mouse's x and y variables
let mouseX = 0, mouseY = 0;

// This allows us to check for any 2 rectangles colliding using their bounding boxes
function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

// Function to fire a shot upward from turtle's current position
function fireBlaster() {
  if (gameOver) return; // Prevent firing after game is over

  const turtleRect = turtle.getBoundingClientRect();

  const blaster = document.createElement("div");
  blaster.className = "blaster";

  // Start at center-top of the turtle
  const startX = turtleRect.left + turtleRect.width / 2 - 2; // offset by half blaster width
  const startY = turtleRect.top;

  blaster.style.left = `${startX}px`;
  blaster.style.top = `${startY}px`;

  blasterContainer.appendChild(blaster);

  // Animate upward
  let y = startY;
  function moveUp() {
    y -= 5; // move 5px per frame
    blaster.style.top = `${y}px`;

    const blasterRect = blaster.getBoundingClientRect();
    const obstacles = document.querySelectorAll(".obstacle");
    for (let obs of obstacles) {
      const obsRect = obs.getBoundingClientRect();
      if (isColliding(blasterRect, obsRect)) {
        obs.remove(); // Destroys the obstacle
        blaster.remove(); // Removes the blaster

        //Checks to see if the player has won the game
        if (document.querySelectorAll(".obstacle").length === 0) {
            handleWin();
        }
        return; // Ends the checking and prevents unnecessary processing
      }
    }

    if (y < -20) {
      blaster.remove(); // Off-screen
    } else {
      requestAnimationFrame(moveUp);
    }
  }

  requestAnimationFrame(moveUp);
}

// Store the interval ID so we can stop it later if needed
let blasterInterval = setInterval(fireBlaster, 1500);
//This controls how fast the blaster shoots

// Keeps mouseX and mouseY updated when our mouse moves
document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Move turtle every frame
function moveTurtle() {
  if (gameOver) return; // Stop movement after losing

  const rect = turtle.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  // This helps us find the center of our turtle

  const dx = mouseX - x;
  const dy = mouseY - y;
  const distance = Math.hypot(dx, dy);
  // This gives you the straight line distance from the mouse

  if (distance > 1) {
    turtle.style.left = rect.left + dx / distance * 3 + "px";
    turtle.style.top = rect.top + dy / distance * 3 + "px";
    //These two control the speed of the turtle
  }

  // Check for collisions between turtle and obstacles
  checkTurtleCollision();

  requestAnimationFrame(moveTurtle);
}

//Potential Lose condition and results start here:

// Part 1: Game state variables
let gameOver = false;

// Part 2: When turtle collides with an obstacle
function checkTurtleCollision() {
  const turtleRect = turtle.getBoundingClientRect();

  const obstacleRect1 = obstacle1.getBoundingClientRect();
  const obstacleRect2 = obstacle2.getBoundingClientRect();
  const obstacleRect3 = obstacle3.getBoundingClientRect();
  const obstacleRect4 = obstacle4.getBoundingClientRect();
  const obstacleRect5 = obstacle5.getBoundingClientRect();
  const obstacleRect6 = obstacle6.getBoundingClientRect();


  if (isColliding(turtleRect, obstacleRect1) || isColliding(turtleRect, obstacleRect2) ||
      isColliding(turtleRect, obstacleRect3) || isColliding(turtleRect, obstacleRect4) ||
      isColliding(turtleRect, obstacleRect5) || isColliding(turtleRect, obstacleRect6)) {
    handleLose();
  }
}

// Part 3: Handles what happens when player loses
function handleLose() {
    if (gameOver) return; // Prevent running this more than once
    gameOver = true;

    turtle.remove(); // Remove the turtle from DOM
    clearInterval(blasterInterval); // Stop the auto-firing

    // Clear remaining blasters
    document.querySelectorAll(".blaster").forEach(b => b.remove());

    // Show a lose message
    const loseMessage = document.createElement("div");
    loseMessage.textContent = "💀 You lost!";
    loseMessage.style.position = "fixed";
    loseMessage.style.top = "50%";
    loseMessage.style.left = "50%";
    loseMessage.style.transform = "translate(-50%, -50%)";
    loseMessage.style.fontSize = "2em";
    loseMessage.style.color = "red";
    document.body.appendChild(loseMessage);
}

function handleWin() {
    if (gameOver) return;
    gameOver = true;

    clearInterval(blasterInterval); // Stop blaster firing
    turtle.remove(); // Optional: remove the turtle or freeze it
    document.querySelectorAll(".blaster").forEach(b => b.remove()); 
    // select all of the blasters and for each remaining blaster, clear it off the screen

    const winMessage = document.createElement("div");
    winMessage.textContent = "🎉 You win!";
    winMessage.style.position = "fixed";
    winMessage.style.top = "50%";
    winMessage.style.left = "50%";
    winMessage.style.transform = "translate(-50%, -50%)";
    winMessage.style.fontSize = "2em";
    winMessage.style.color = "green";
    document.body.appendChild(winMessage);

}

moveTurtle(); // Start the turtle movement loop


