// declare context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



//declare constants and variables
const dim = 20;
let move = new Audio();
let eat = new Audio();
let dead = new Audio();

let speed;
let vitesse;
let score = 0;

move.src = "asset/sounds/move.mp3";
eat.src = "asset/sounds/eat.mp3";
dead.src = "asset/sounds/dead.mp3";

//create apple 
let apple = {
  x: appleRandom(),
  y: appleRandom(),
}

//create snake
let snake = [];
snake[0] = {
  x: 160,
  y: 300
}

//choosing mode
document.getElementById('modeGame').addEventListener('change', () => {
  let modeGame = document.getElementById('modeGame');
  for (let i = 0; i < modeGame.options.length; i++) {
    if (modeGame[i].selected) {
      if (modeGame[i].value == "classic") {
        document.getElementById('modeDiv').style.display = 'inline';
        //test buttons begin................................
        //modes with buttons
        document.getElementById('easy').addEventListener('click', () => {
          document.getElementById('easyRadio').checked = true;

          speed = 300;
        });

        document.getElementById('medium').addEventListener('click', () => {
          document.getElementById('mediumRadio').checked = true;

          speed = 200;
        });

        document.getElementById('hard').addEventListener('click', () => {
          document.getElementById('hardRadio').checked = true;

          speed = 50;
        });
        //test buttons end.......................................

      } else if (modeGame[i].value == "blitz") {
        document.getElementById('modeDiv').style.display = 'none';

      }
    }
  }
});

//speed value from radio if is checked (radio button)
document.addEventListener('change', () => {
  let val = document.getElementsByName('mode');
  for (let i = 0; i < val.length; i++) {
    if (val[i].checked) {
      speed = val[i].value;
    }
  }

});



/******************************** Functions ******************************************************/
//draw snake function*********************************************************************
function drawSnake() {

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "ForestGreen" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, dim, dim);

    ctx.strokeStyle = (i == 0) ? "red" : "black";
    ctx.strokeRect(snake[i].x, snake[i].y, dim, dim);
  }

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // change direction
  if (d == "LEFT") snakeX -= dim;
  if (d == "UP") snakeY -= dim;
  if (d == "RIGHT") snakeX += dim;
  if (d == "DOWN") snakeY += dim;

  // if the snake eats the food
  if (snakeX == apple.x && snakeY == apple.y) {
    eat.play();
    score++;
    document.getElementById("displayScore").innerHTML = score;

    apple = {
      x: appleRandom(),
      y: appleRandom(),
    }

    // we don't remove the tail
  } else {
    // removing the tail
    snake.pop();
  }

  // adding new Head
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  // detected side walls and collision
  if (snakeX < 0 || snakeX > canvas.width - dim || snakeY < 0 || snakeY > canvas.height - dim || collision(newHead, snake)) {

    dead.play();

    ctx.fillStyle = "red";
    ctx.fillRect(100, 50, 400, 250);
    ctx.fillStyle = "white";
    ctx.font = "70px Changa one";
    ctx.fillText("Game Over!", 120, 150);
    ctx.font = "50px Changa one";
    ctx.fillText('You won ' + score + ' points', 115, 200);
    ctx.font = "30px Changa one";
    ctx.fillText("press F2 to restart the game", 140, 250);
    clearTimeout(game);
  }
  // snake growing 
  snake.unshift(newHead);

  drawApple();
  updateGame();

};// draw snake function fin....................................................


//draw apple function **********************************************************
function drawApple() {
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x, apple.y, dim, dim)

} // draw apple fin


//random function *************************************************************
function appleRandom() {
  return Math.floor((Math.random() * 29) + 1) * dim;
} // random function fin

//control the snake event and function ******************************************
let d;
document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    move.play();
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    move.play();
    d = "UP";
  } else if (key == 39 && d != "LEFT") {
    move.play();
    d = "RIGHT";
    move.play();
  } else if (key == 40 && d != "UP") {
    move.play();
    d = "DOWN";
  }
} // control the snake funtion fin ...............................................

// function collision() quand le snake se touche alors game over********************
function collision(snake_head, snake_body) {
  for (let i = 0; i < snake_body.length; i++) {
    if (snake_head.x == snake_body[i].x && snake_head.y == snake_body[i].y) {
      return true;
    }
  }
  return false;
}; //collision function fin .......................................................



// animation for move snake along border ***************************************
function update() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (score < 5) {
    vitesse = 300;
  } else if (score < 10) {
    vitesse = 200;
  } else if (score < 20) {
    vitesse = 100;
  } else if(score < 30){
    vitesse = 75;
  }
  else {
    vitesse = 50;
  }
 
  drawSnake();
} //animation fin .................................................................


//updateGame function *************************************************************
function updateGame() {

  setTimeout(update, speed?speed:vitesse);

} //updateGame fin ..............................................................


//call the game *****************************************************************
updateGame();



//restart the game event and function ********************************************
document.addEventListener("keydown", restart);
function restart(event) {
  let key = event.keyCode;
  if (key == 113) {
    location.reload();
  }
};

  //add a function pause()

  //add a function highscore()
