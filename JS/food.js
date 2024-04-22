import { onSnake, expandSnake} from './snake.js';
import { randomGridPosition } from './grid.js';

let food = getRandomFood();
const expansionRate = 1;


export function update(){
    if(onSnake(food)){
        expandSnake(expansionRate);
        food = getRandomFood();
    }

}


export function draw(gameBoard){
    let foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;

    foodElement.classList.add("food");
    
    gameBoard.appendChild(foodElement);

}


function getRandomFood(){
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}