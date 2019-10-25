/*----- constants -----*/
const WINNER_ARRAY_NUNBERS = [
    [1,2,3],
    [4,5,6,],
    [7,8,9,],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];

const ROW_COUNT = 3;
const COLUMN_COUNT = 3;

/*----- app's state (variables) -----*/
let player  = {
    one: 'O',
    two: 'X'
}

let isPlayerOneTurn = true;

let boardEl = document.getElementById('board');
/*----- cached element references -----*/

/*----- event listeners -----*/
boardEl.addEventListener('click', handleLetterClick);
/*----- functions -----*/
function handleLetterClick(evt){
    console.log(evt.target.id);
    if (isPlayerOneTurn){
        evt.target.textContent = player.one;
    }
    else{
        evt.target.textContent = player.two;
    }
    isPlayerOneTurn = !isPlayerOneTurn;
    
};

function createBoard(){
    
       // key for each cell in the grid 
    let keyNumber = 0;
    for (let iR=1; iR<= ROW_COUNT; iR++){
        console.log('hello');
        for (let iC=1; iC<= COLUMN_COUNT; iC++){
            console.log('helloe2');
            keyNumber++;
            let divEl = document.createElement('div');
            divEl.setAttribute("id",keyNumber.toString());
            divEl.setAttribute("class",'"ticTic');
            divEl.textContent = keyNumber;
            boardEl.appendChild(divEl);
        }
    }
}

createBoard();