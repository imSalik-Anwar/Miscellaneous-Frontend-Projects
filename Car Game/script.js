
let speedBodter = 0
// get the score board div to display the score
let scoreBoard = document.getElementById("score-board")
let score = document.createElement("div")
score.innerHTML = `Score: `
score.id = "score"
scoreBoard.append(score)
// define player
let player = {
    speed: 3,
    score: 0
}
// keys to be used in the game
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}
// start the game when start button is clicked
let startbtn = document.querySelector("button")
startbtn.addEventListener("click", startGame)

let startScreen = document.getElementById("start-screen")
let myCar = document.getElementById("my-car")
function startGame(eventDetails){
    // hide the start screen
    startScreen.classList.add("hide")
    // start the game for the player
    player.start = true
    // add strips to the road
    let road = document.getElementById("road")
    for(let s = 0; s < 5; s++){
        let strip = document.createElement("div")
        strip.className = "strip"
        road.append(strip)
        strip.y = s * 125
        strip.style.top = strip.y +"px"
    }
    // get my car's initial position and assign it to player
    player.x = myCar.offsetLeft
    player.y = myCar.offsetTop
    // create a function to controll the car
    requestAnimationFrame(carController)
    // Add enemy cars
    for(let i = 0 ; i < 3; i++){
        let enemy = document.createElement('div');
        enemy.className = 'enemy';
        if(i == 0){
            // enemy.style.backgroundImage = "url(https://static.vecteezy.com/system/resources/previews/009/385/398/non_2x/car-top-view-clipart-design-illustration-free-png.png)"
            enemy.style.backgroundImage = "url('e-1.png')"
        }
        if(i == 1){
            // enemy.style.backgroundImage = "url(https://static.vecteezy.com/system/resources/previews/009/342/540/non_2x/car-top-view-clipart-design-illustration-free-png.png)"
            enemy.style.backgroundImage = "url('e-2.png')"
        }
        if(i == 2){
            // enemy.style.backgroundImage = "url(https://static.vecteezy.com/system/resources/previews/009/398/887/non_2x/car-top-view-clipart-design-illustration-free-png.png)"
            enemy.style.backgroundImage = "url('e-3.png')"
        }
        enemy.y = (i) * 50;
        enemy.style.top = enemy.y + "px";
        enemy.style.left = parseInt(Math.random()*290) + "px";
        road.append(enemy);
    }
}
function isCollide(a,b){
    let aRect = a.getBoundingClientRect(); 
    let bRect = b.getBoundingClientRect();
 
     let collideCondition = (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right);
     return !collideCondition;
 }
 
 function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your final score is " + player.score + "<br> Press here to restart the game";
    startScreen.style.color = "white"
    startScreen.style.fontWeight = "700"
    startScreen.style.textAlign = "center"
    startScreen.style.paddingTop = "100px"
    startScreen.style.boxShadow = "0 0 20px red"
    // Reload the page after 3 seconds
    setTimeout(function() {
    location.reload();
    }, 5000); // 5000 milliseconds (5 seconds)
 }
function moveEnemy(car){
    const enemies = document.querySelectorAll('.enemy');

    enemies.forEach((enemy)=>{

    if(isCollide(car, enemy)){
        console.log('Boom! hit');
        endGame();
    }
    if(enemy.y >= 500){
        enemy.y = enemy.y - 600;
        enemy.style.left = parseInt(Math.random()*290) + "px";
        player.score++
        score.innerHTML = `Score: ${player.score}`
    }
       speedBodter += 0.001
       enemy.y = enemy.y + player.speed + speedBodter;
       enemy.style.top = enemy.y + "px";
    })
}
function moveStrips(){
    const strips = document.querySelectorAll('.strip');
    // console.log(strips)
    strips.forEach((strip)=>{
        if(strip.y > 600){
            strip.y -= 650;
        } else {
            strip.y += player.speed + speedBodter;
        }
        strip.style.top = strip.y + "px";
    })
}
function carController(){
    // move the strips on the road
    moveStrips()
    moveEnemy(myCar)
    if(player.start){
        // move car in respective direction based on the key pressed
        if(keys.ArrowUp && player.y > 5){
            player.y -= player.speed + speedBodter
        }
        else if(keys.ArrowDown && player.y < 450){
            player.y += player.speed + speedBodter*2
        }
        else if(keys.ArrowLeft && player.x > 10){
            player.x -= player.speed + speedBodter
        }
        else if(keys.ArrowRight && player.x < 265){
            player.x += player.speed + speedBodter
        }
        // update car's location
        myCar.style.left = player.x + 'px';
        myCar.style.top = player.y + 'px';

        requestAnimationFrame(carController);
    }
}
// create functions to register key press and key release events
document.addEventListener("keydown", keyPress)
document.addEventListener("keyup", keyRelease)

function keyPress(eventDetails){
    // prevent any default behaviour of the key
    eventDetails.preventDefault()
    let pressedKey = eventDetails.key
    // check if pressed key is one of the keys we have assigned to use in this game
    if(pressedKey === 'ArrowUp' || pressedKey === 'ArrowDown' || pressedKey === 'ArrowLeft' || pressedKey === 'ArrowRight'){
        keys[pressedKey] = true
    }
}

function keyRelease(eventDetails){
    // prevent any default behaviour of the key
    eventDetails.preventDefault()
    let releasedKey = eventDetails.key
    // check if pressed key is one of the keys we have assigned to use in this game
    if(releasedKey === 'ArrowUp' || releasedKey === 'ArrowDown' || releasedKey === 'ArrowLeft' || releasedKey === 'ArrowRight'){
        keys[releasedKey] = false
    }    
}


