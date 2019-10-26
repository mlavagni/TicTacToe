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

let boardEl = document.getElementById('board');
/*----- cached element references -----*/

/*----- event listeners -----*/
boardEl.addEventListener('click', handleLetterClick);
/*----- functions -----*/
function handleLetterClick(evt){
    //console.log(evt.target.id);
    if(!gameOver) {
    if (isPlayerOneTurn){
        evt.target.textContent = player.one;
    }
    else{
        evt.target.textContent = player.two;
    }
   
    findTheWinner();
}
};

function render(){

}
function findTheWinner(){
    let arrayNumbersGrid = [];
    let allCellsGrid = boardEl.getElementsByTagName("div");
    //boardEl = document.getElementById('board');
    for (let i = 0; i < allCellsGrid.length; i++ ){
        if (isPlayerOneTurn){
            
            if (player.one === allCellsGrid[i].textContent)
                arrayNumbersGrid.push(allCellsGrid[i].id) 
            
            }else if (player.two === allCellsGrid[i].textContent){
                arrayNumbersGrid.push(allCellsGrid[i].id)
            }     
    }
    
    for (let i = 0; i < WINNER_ARRAY_NUNBERS.length; i++){
        var countWinner = 0;
        for (let i2 = 0; i2 < arrayNumbersGrid.length; i2++){
            if (WINNER_ARRAY_NUNBERS[i].includes(arrayNumbersGrid[i2])){
                console.log( 'winner num ' + WINNER_ARRAY_NUNBERS[i] + ' array ' + arrayNumbersGrid[i2])
                countWinner++;
                console.log('count winer ' + countWinner);
                if (countWinner === 3){
                    if (isPlayerOneTurn){
                        console.log('Player Num 1 Wins')  
                     } else{
                        console.log('Player Num 2 Wins')
                     }
                     gameOver = true;
                     return;
                }
            }
        }
    }
    
 
    isPlayerOneTurn = !isPlayerOneTurn;
}
  

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