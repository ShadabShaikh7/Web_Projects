/*Part 1 */

const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");


/*Part 2 */
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
// console.log(keys);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

/*Part 3 */

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    console.log(e.key);
    console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    console.log(e.key);
    console.log(keys);
}

function GameOver(para01,para02) {
    YourCarPostion = para01.getBoundingClientRect();
    OtherCarPosition = para02.getBoundingClientRect();  


    return !((YourCarPostion.bottom < OtherCarPosition.top) || (YourCarPostion.top > OtherCarPosition.bottom) || (YourCarPostion.right < OtherCarPosition.left) || (YourCarPostion.left > OtherCarPosition.right))
}

function playLines(){
    let lines =document.querySelectorAll('.lines');

    lines.forEach(function(element){

        if(element.y >= 800){
            element.y -= 900;

        }

        element.y += You.carSpeed;
        element.style.top = element.y + "px"
    })
}

function endYourGame() {
    You.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your Final Score is " + You.YourScore + "<br>Click here to restart your game";
}

function endYourGame(){
    You.start = false;
    startScreen.classList.remove('hide')
    startScreen.innerHTML =  "Game Over <br> Your Final Score is " + You.YourScore + "<br>Click here to restart your game";
}

function moveOtherCars(Car){
    let other =document.querySelectorAll('.other')

    other.forEach(function (element) {

        if (GameOver(Car, element)) {
            console.log('Game Over');
            endYourGame();
        }

        if (element.y >= 850) {
            //element.y -= 900;
            element.y = -400;
            element.style.left = Math.floor(Math.random() * 400) + "px";
        }
        element.y += You.carSpeed;
        element.style.top = element.y + "px";
    })
}

/*Part 4 */
document.addEventListener('click',start);

var You = { carSpeed: 8,YourScore: 0 };

/*Part 6 */

function playYourGame(){
    console.log('play the game');

    let Car=document.querySelector('.Car')

    let YourGameRoad = gameArea.getBoundingClientRect();
    console.log(YourGameRoad);

    if(You.start){

        /*Part 8 */
        playLines()
        moveOtherCars(Car);

        if(keys.ArrowUp && You.y > (YourGameRoad.top + 150)){
            You.y -= You.carSpeed;
        }

        if(keys.ArrowDown && You.y < YourGameRoad.bottom - 150){
            You.y += You.carSpeed;
        }

        if(keys.ArrowLeft && You.x > 0){
            You.x -= You.carSpeed;
        }

        if(keys.ArrowRight && You.x < YourGameRoad.width - 100){
            You.x += You.carSpeed;
        }

        Car.style.top = You.y + "px";    // Top Position 
        Car.style.left = You.x + "px";   // Left Position 
        window.requestAnimationFrame(playYourGame);
        console.log(You.YourScore++);

        You.YourScore++;
        let FinalScore = You.YourScore - 2;
        score.innerText = "Your game score is : " +  FinalScore;

    }
}


/*Part 5 */

function start(){
    // gameArea.classList.remove('hide');
   
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    You.start = true;
    window.requestAnimationFrame(playYourGame);

    /*Part 9 */

    for (let i = 0; i < 8; i++){
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'lines');
    roadLine.y = (i * 150);
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
    }


    
    /*Part 7 */

    let yourCar = document.createElement('div');
    yourCar.setAttribute('class','Car')
    // yourCar.innerHTML='First car'
    gameArea.appendChild(yourCar);

    You.x=yourCar.offsetLeft;
    You.y=yourCar.offsetTop;
    
    console.log("Left Side", yourCar.offsetLeft);
    console.log("Top Side", yourCar.offsetTop);

    for(let j=0;j<4;j++){
        let otherCar =document.createElement('div');
        otherCar.setAttribute('class','other');
        otherCar.y = ((j +1) * 300) * -1;
        otherCar.style.top = otherCar.y + "px"
        // otherCar.style.background = "orange";
        otherCar.style.left = Math.floor(Math.random() * 300) + "px";
        gameArea.appendChild(otherCar);
    }
}