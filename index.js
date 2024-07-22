const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//function to initialise game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //need to empty UI grid also
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //one more thing to add, green color needs to be removed; initialise boxes with css properties again
        box.classList = `box box${index+1}`;

        
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player: ${currentPlayer}`;
}

initGame();


function swapTurn(){
    if(currentPlayer=="X")
        currentPlayer = "O";
    else
        currentPlayer = "X";

    //UI Update
    gameInfo.innerText = `Current Player: ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]]) ) {
            //check if winner is X
            if(gameGrid[position[0]]==="X")
                answer = "X";
            else 
                answer = "O";

            //disabling pointer event to prevent further moves
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X or O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //we will have a winner if answer is not empty
    if(answer!==""){
        gameInfo.innerText = `Winner: ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //lets check for tie!
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    })
    
    //if board is filled game is tied
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }

    //newGameBtn.classList.add("active");
}

function handleClick(index) {
    if(gameGrid[index]==""){
        boxes[index].innerText = currentPlayer; //inserts into UI
        gameGrid[index] = currentPlayer; //inserts into inner logic
        boxes[index].style.pointerEvents = "none";
        //swap the turn
        swapTurn();
        //check if either player has won at this point
        checkGameOver();
    }
}

boxes.forEach((box, index) => {         //see why we didnt use event.target()
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);