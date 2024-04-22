import { getInputDirection } from './input.js';

export let snakeSpeed = 7;
let newSegments  = 0;
let snakeBody = [
    {x:10,y:10},
]


export function update(){
    addSegments();

    const inputDirection = getInputDirection();

    //Shifting all element by the previous except the last one
    for(let i = snakeBody.length - 2; i>=0; i--){
        snakeBody[i+1] = {...snakeBody[i]};
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

}



export function draw(gameBoard){
    snakeBody.forEach((element, index)=>{
        let snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = element.x;
        snakeElement.style.gridRowStart = element.y;

        // if(index == 0){
        //     snakeElement.classList.add("head");
        // }else{
        //     snakeElement.classList.add("snake");
        // }
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);

    })
}


export function expandSnake(amount){
    newSegments += amount;
}

export function onSnake(position, {ignoreHead = false} = {}){
    return snakeBody.some((segment, index) =>{
        if(ignoreHead && index === 0) return false;
        return eualPositions(segment,position);
    })
}

function eualPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

export function getSnakeHead(){
    return snakeBody[0];
}

export function snakeIntersect(){
    return onSnake(snakeBody[0], {ignoreHead : true});
}


//Increase snake body (add a new segment)
function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0;    
}