import { update as gameUpdate, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersect } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import {outsideGrid} from './grid.js';

//Game Variables
const gameBoard = document.querySelector(".board");
const gameRestart = document.querySelector(".reset");
let lastRenderTime = 0;
let gameOver = false;
export let currentScore = 0;
export let highScore = 0;


//Game Functions
//Main Loop to run every few milisecond
function main(currenttime){

    //Checking Game Over or not
    if(gameOver){
        // if(confirm('You Lost. Press ok to restart..')){
        //     window.location = '/';
        // }
        gameRestart.addEventListener('click', ()=>{
            window.location.reload();
        });
        return;
    }

    window.requestAnimationFrame(main);

    if((currenttime - lastRenderTime)/1000 < 1/snakeSpeed){
        return;
    }
    lastRenderTime = currenttime;

    update();
    draw();

}

//All the Updates of Snake & food like incresing & moving Snake
function update(){
    gameUpdate();
    updateFood();
    checkDeath();
}

//Drawing all The Elements - Snake & Food
function draw(){
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersect()
}


//Main Logic
window.requestAnimationFrame(main);