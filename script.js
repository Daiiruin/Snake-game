// I will put some comments to help you understand the code ! =)

// When the DOM is fully loaded, execute this code
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const scoreElement = document.getElementById('score');

  let bestScore = 0;

  let box = 20;

  let snake = [];
  snake[0] = {
    x: 10 * box,
    y: 10 * box
  }

  let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
  }

  let score = 0;

  let direction

  // Listen for keyboard input to set the direction of the snake
  document.addEventListener('keydown', setDirection);
  function setDirection(event) {
    let key = event.keyCode;
    if (key == 37 && direction != 'right') {
      direction = 'left';
    } else if (key == 38 && direction != 'down') {
      direction = 'up';
    } else if (key == 39 && direction != 'left') {
      direction = 'right';
    } else if (key == 40 && direction != 'up') {
      direction = 'down';
    }
  }

  // Function to draw the game on the canvas
  function draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < snake.length; i++) {
      context.fillStyle = (i == 0) ? 'red' : 'black';
      context.fillRect(snake[i].x, snake[i].y, box, box);
      context.strokeStyle = 'white';
      context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = 'purple';
    context.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'left') snakeX -= box;
    if (direction == 'up') snakeY -= box;
    if (direction == 'right') snakeX += box;
    if (direction == 'down') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
      }
    } else {
      snake.pop();
    }

    let newHead = {
      x: snakeX,
      y: snakeY
    }

    // Check for collision with walls or itself
    if (snakeX < 0 || snakeX > 19 * box || snakeY < 0 || snakeY > 19 * box || collision(newHead, snake)) {
      gameOver()
    }

    snake.unshift(newHead);

    // Update and display the current score
    scoreElement.textContent = 'Score : ' + score;
  }

  // Function to check for collision between snake's head and its body
  function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
      if (head.x == array[i].x && head.y == array[i].y) {
        return true;
      }
    }
    return false;
  }

  let game = setInterval(draw, 100);

  // Function to update and display the best score
  function updateBestScore() {
    const bestScoreElement = document.getElementById('bestScore');
    bestScoreElement.textContent = 'Best Score: ' + bestScore;
  }

  // Function to handle game over logic
  function gameOver() {
    clearInterval(game);
    const gameOverElement = document.getElementById('game-over');
    gameOverElement.style.display = 'block';

    if (score > bestScore) {
      bestScore = score;
      updateBestScore();
    }

    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
      snake = [];
      snake[0] = {
        x: 10 * box,
        y: 10 * box
      };
      food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
      };
      score = 0;
      direction = '';

      gameOverElement.style.display = 'none';

      clearInterval(game);

      game = setInterval(draw, 100);
    });
  }
});