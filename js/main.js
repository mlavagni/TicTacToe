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
const MAX_MOVES = 9;

/*----- app's state (variables) -----*/
let player  = {
    one: 'O',
    scoreOne: 0,
    two: 'X',
    scoreTwo: 0
}

let isPlayerOneTurn = true;
let boardCreaded = false;
let numMoves = 0;


/*----- cached element references -----*/
const boardEl = document.getElementById('board');
const allCellsGrid = boardEl.getElementsByTagName("div");
const playerTurn = document.getElementById("player");
const winnerEl = document.getElementById("winner");
const ressetEl = document.getElementById("resset");

/*----- event listeners -----*/
boardEl.addEventListener('click', handleLetterClick);
ressetEl.addEventListener('click', ressetGame);
/*----- functions -----*/
function handleLetterClick(evt){
    if (evt.target.classList[1] !== 'container'){
        if (!checkIfChecked(evt)){
            if(!gameOver) {
                (isPlayerOneTurn) ? evt.target.textContent = player.one : evt.target.textContent = player.two;
                render();
            }
        }
    }
};

function render(){
   playerTurn.textContent = isPlayerOneTurn ? "Player 1 Turn" : "Player 2 Turn";

    if (!boardCreaded) createBoard();
    findTheWinner(addNumbersToArray());  
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
                countWinner++;
                if (countWinner === 3){
                    if (isPlayerOneTurn){
                        winnerEl.textContent = "Player Num 1 Wins"; 
                        winnerEl.style.visibility =  'visible';
                        playerTurn.textContent = 'Game Over';
                        playerTurn.parentNode.classList = 'gameOver';
                        player.scoreOne += 1;
                        document.getElementById("score1").textContent = player.scoreOne;
                     } else{
                        winnerEl.textContent = 'Player Num 2 Wins';
                        winnerEl.style.visibility =  'visible';
                        playerTurn.textContent = 'Game Over';
                        playerTurn.parentNode.classList = 'gameOver';
                        player.scoreTwo += 1;
                        document.getElementById("score2").textContent = player.scoreTwo;
                     }
                     gameOver = true;
                     (gameOver) ? ressetEl.style.visibility = 'visible' : 'hidden';
                     return;
                }
            }
        }
    }
    if (arrayNumbersGrid.length > 0) {
        numMoves++;
        isPlayerOneTurn = !isPlayerOneTurn;
        playerTurn.textContent = isPlayerOneTurn ? "Player 1 Turn" : "Player 2 Turn";
        if (checkIfGameIsTide()) return;
    }
    
}

function checkIfGameIsTide(){
    if (gameOver === false && numMoves === MAX_MOVES) {
        gameOver=true;
        (gameOver) ? ressetEl.style.visibility = 'visible' : 'hidden';
        winnerEl.style.visibility =  'visible';
        playerTurn.textContent = 'Game Over';
        winnerEl.textContent = "No Winners 'Tie' ";
        playerTurn.parentNode.classList = 'gameOver';
        return true;
    }else{
        return false;
    }
}

function createBoard() {
    // key for each cell in the grid 
    let keyNumber = 0;
    for (let iR=1; iR<= ROW_COUNT; iR++){
        for (let iC=1; iC<= COLUMN_COUNT; iC++){
            keyNumber++;
            let divEl = document.createElement('div');
            divEl.setAttribute("id",keyNumber.toString());
            divEl.classList.add(`id${keyNumber.toString()}`,'"ticTic');
            boardEl.appendChild(divEl);
        }
    }
    boardCreaded = true;
}

function checkIfChecked(evt){
    let checked = evt.target.textContent;
    return checked === player.two || checked === player.one?  true : false;
}

function ressetGame(){
   // location.reload();
    isPlayerOneTurn = true;
    boardCreaded = true; 
    gameOver=false;
    winnerEl.style.visibility =  'hidden';
    ressetEl.style.visibility = 'hidden';
    playerTurn.parentNode.classList.remove('gameOver');
    playerTurn.textContent = 'Player 1 Turn';
    winnerEl.textContent = '';
    numMoves = 0;
    
    for (let i = 0; i < allCellsGrid.length; i++ ){
         allCellsGrid[i].textContent = '';
    }     
}

render();