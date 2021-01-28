let speed = 500;


//choosing mode
document.getElementById('modeGame').addEventListener('change', ()=>{
  let modeGame = document.getElementById('modeGame');
  for(let i = 0 ; i < modeGame.options.length ; i++){
    if( modeGame[i].selected){
      if(modeGame[i].value =="classic"){



//POP UP MODAL
        function togglePopup(){
          document.getElementById("popup-1").classList.toggle("active");
        }




        document.getElementById('modeDiv').style.display = 'inline';

//alert
        // let q = document.querySelectorAll('modeDiv').clicked;
        //     if( q = true){
        //       window.alert("choose your difficulty");
              




        //testbegin
//modes with buttons
document.getElementById('easy').addEventListener('click', ()=>{ 
  document.getElementById('easy').style.backgroundColor = "#98fa98";
  speed = 300;
});

document.getElementById('medium').addEventListener('click', ()=>{ 
  document.getElementById('medium').style.backgroundColor = "#98fa98";
  speed = 200;
});

document.getElementById('hard').addEventListener('click', ()=>{ 
  document.getElementById('hard').style.backgroundColor = "#98fa98";
  speed = 50;
});

//alert
// };
        //testend

      }else if (modeGame[i].value =="blitz"){
        document.getElementById('modeDiv').style.display = 'none';
        
        speed = vitesse;
    
      }
    }
  }
});





// declare context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//declare constants and variables
const dim = 20;
let move = new Audio();
let eat = new Audio();
let dead = new Audio();

let score = 0;
let vitesse = 500;

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
//draw snake
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
      score+=10;
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

    // detected side walls
    if (snakeX < 0 || snakeX > canvas.width - dim || snakeY < 0 || snakeY > canvas.height - dim || collision(newHead, snake)) {


        
        dead.play();

        // alert("game over!")   //here we need to replace alert with function gameover
        //document.getElementById("displayScore").innerHTML = "you lose!"

        ctx.fillStyle = "red";
        ctx.fillRect(100, 50, 400, 200);
        ctx.fillStyle = "white";
        ctx.font = "70px Changa one";
        ctx.fillText("Game Over!", 120, 150);
        ctx.font = "50px Changa one";
        ctx.fillText('You won ' + score + ' points', 115, 200);
        ctx.fillStyle = "black";
        ctx.font = "30px Changa one";
        ctx.fillText("press F2 to restart the game", 140, 300);
        clearTimeout(game);//
      }
      // snake growing 
      snake.unshift(newHead);
      
      drawApple();
      updateGame();
  }


  function drawApple() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, dim, dim)

  }

  function appleRandom() {
    return Math.floor((Math.random() * 29) + 1) * dim;
  }

//control the snake
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
  }


// animation for move snake along border
    function update() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if( score <= 50 ){
        vitesse = 300;
      }else if( score > 50 && score <= 70 ){
        vitesse = 150;
      }else if( score >70 && score <= 100 ){
        vitesse = 50;
      }else{
        vitesse = 10;
      }
       console.log("vitesse: " + vitesse);

      drawSnake();//

      // blitz
  // if( test = 500 && score <= 50 ){
  //           vitesse = 500;
  //       }else if( score <= 70 ){
  //         vitesse = 400;
  //         }else if( score <= 100 ){
  //          vitesse = 200;
  //           }else{
  //             vitesse = 100;
  //           }
  //     if( test = 300 && score <= 50 ){
  //           vitesse = 300;
  //         }else if( score <= 70 ){
  //             vitesse = 150;
  //           }else if( score <= 100 ){
  //               vitesse = 50;
  //             }else{
  //                 vitesse = 10;
  //     }if( test = 200 && score <= 50 ){
  //            vitesse = 200;
  //          }else if( score <= 70 ){
  //               vitesse = 100;
  //             }else if( score <= 100 ){
  //                 vitesse = 50;
  //               }else{
  //                 vitesse = 10;
  //               }
  }

    function updateGame() {
      setTimeout(update, speed);
      
    }

    
    
    updateGame();



    //restart the game
    document.addEventListener("keydown", restart);
    function restart(event) {
      let key = event.keyCode;
      if (key == 113) {
        location.reload();
      }
    }

  // function collision() quand le snake se touche alors game over

  function collision(snake_head, snake_body){
    for(let i = 0; i < snake_body.length; i++){
      if(snake_head.x == snake_body[i].x && snake_head.y == snake_body[i].y ){
        return true;
      }
    }
    return false;
  };

  //add a function pause()

  //add a function highscore()
