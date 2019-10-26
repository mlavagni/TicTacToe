/*----- constants -----*/
const WINNER_ARRAY_NUNBERS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
];
var gameOver = false;
const ROW_COUNT = 3;
const COLUMN_COUNT = 3;

/*----- app's state (variables) -----*/
let player  = {
    one: 'O',
    two: 'X'
}

let isPlayerOneTurn = true;
let boardCreaded = false;

/*----- cached element references -----*/
const boardEl = document.getElementById('board');
const allCellsGrid = boardEl.getElementsByTagName("div");
const playerTurn = document.getElementById("player");
const winnerEl = document.getElementById("winner");

/*----- event listeners -----*/
boardEl.addEventListener('click', handleLetterClick);

/*----- functions -----*/
function handleLetterClick(evt){
    if(!gameOver) {
        (isPlayerOneTurn) ? evt.target.textContent = player.one : evt.target.textContent = player.two;
        render();
    }
};

function render(){
    if (!boardCreaded) createBoard();
    findTheWinner(addNumbersToArray());

    playerTurn.textContent = isPlayerOneTurn ? 1 : 2;
}

//adding numbers to the array to check in findThe Winner who won
function addNumbersToArray(){
    let arrayNumbersGrid = [];
    for (let i = 0; i < allCellsGrid.length; i++ ){
        if (isPlayerOneTurn){
            if (player.one === allCellsGrid[i].textContent)
                arrayNumbersGrid.push(allCellsGrid[i].id) 
            }else if (player.two === allCellsGrid[i].textContent){
                arrayNumbersGrid.push(allCellsGrid[i].id)
            }     
    }
    return arrayNumbersGrid
}

function findTheWinner(arrayNumbersGrid){
    for (let i = 0; i < WINNER_ARRAY_NUNBERS.length; i++){
        var countWinner = 0;
        for (let i2 = 0; i2 < arrayNumbersGrid.length; i2++){
            if (WINNER_ARRAY_NUNBERS[i].includes(arrayNumbersGrid[i2])){
                //console.log( 'winner num ' + WINNER_ARRAY_NUNBERS[i] + ' array ' + arrayNumbersGrid[i2])
                countWinner++;
                //console.log('count winer ' + countWinner);
                if (countWinner === 3){
                    if (isPlayerOneTurn){
                        winnerEl.textContent = "Player Num 1 Wins"; 
                     } else{
                        winnerEl.textContent = 'Player Num 2 Wins';
                     }
                     gameOver = true;
                     return;
                }
            }
        }
    }
    
 
    isPlayerOneTurn = !isPlayerOneTurn;
}

function createBoard() {
    // key for each cell in the grid 
    let keyNumber = 0;
    for (let iR=1; iR<= ROW_COUNT; iR++){
        for (let iC=1; iC<= COLUMN_COUNT; iC++){
            keyNumber++;
            let divEl = document.createElement('div');
            divEl.setAttribute("id",keyNumber.toString());
            //divEl.setAttribute("class",'"ticTic');
            divEl.classList.add(`id${keyNumber.toString()}`,'"ticTic');
            //divEl.textContent = keyNumber;
            boardEl.appendChild(divEl);
        }
    }
    boardCreaded = true;
}

render();