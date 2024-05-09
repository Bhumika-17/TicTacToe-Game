function PlayGame(event){
    event.preventDefault();
    var player1Name = document.getElementById('player1').value;
    var player2Name = document.getElementById('player2').value;

    localStorage.setItem('player1', player1Name);
    localStorage.setItem('player2', player2Name);

    window.location.href = 'game.html';

}

let cells = document.querySelectorAll(".box"); 
let resetBtn = document.querySelector(".Resetbtn");
let homeBtn = document.querySelector(".HomeBtn");

homeBtn.addEventListener("click", () => {
    window.location.href = 'welcome.html';
});
let turnPlayer1 = true;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


if( localStorage.getItem('player2')=='Bot'){
    SinglePlayer();
}else{
    TwoPlayer();
}

function SinglePlayer(){
    Array.from(cells).forEach((box) => {
        box.addEventListener("click", () => {
            console.log("box was clicked!");
            if (turnPlayer1) {
                box.innerText = "O";
                turnPlayer1 = false;
                box.disabled = true;
                checkWinner();
                //bot's turn to play automatically in any empty box after player1
                let emptyBoxes = Array.from(cells).filter(box =>
                    box.innerText !=='O' && box.innerText !== 'X'
                );
                if(emptyBoxes.length > 0){
                    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
                    randomBox.innerText='X';
                    randomBox.disabled=true;
                    turnPlayer1=true;
                    checkWinner();
                }
            }
        });
    });
}


function TwoPlayer(){
    var winnerDisplay = document.getElementById('winner-display');
    winnerDisplay.innerText = localStorage.getItem('player1') + "'s turn";
    cells.forEach((box) => {
        box.addEventListener("click", () => {
            console.log("box was clicked!");
            winnerDisplay.innerText = localStorage.getItem('player1') + "'s turn";
            if (turnPlayer1){
                box.innerText = "O";
                turnPlayer1 = false;
                winnerDisplay.innerText = localStorage.getItem('player2') + "'s turn";
            } else {
                box.innerText = "X"; //player2's turn
                turnPlayer1 = true;
            }
    
            box.disabled = true;
            checkWinner();
        });
    });
}

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1 = cells[pattern[0]].innerText;
        let pos2 = cells[pattern[1]].innerText;
        let pos3 = cells[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("winner", pos1);
                printWinner(pos1);
            }
        }
        let emptyBoxes = Array.from(cells).filter(box =>
        box.innerText !=='O' && box.innerText !== 'X'
        );
        if(emptyBoxes.length == 0){
            var winnerDisplay = document.getElementById('winner-display');
            winnerDisplay.innerText= "No Winner in the Game";
        }
    }
};

function printWinner(pos){
    var winnerDisplay = document.getElementById('winner-display');
    var player1Name = localStorage.getItem('player1');
    var player2Name = localStorage.getItem('player2');
    var Winner;
    if(pos === 'O'){
        Winner = player1Name;
    } else {
        Winner = player2Name;
    }
    
    winnerDisplay.innerText = "Winner is " + Winner + " !!!";

    cells.forEach(box => {
        box.disabled = true; 
    });

}

resetBtn.addEventListener("click", () => {
    cells.forEach(box => {
        box.innerText = ""; 
        box.disabled = false; 
    });
    turnPlayer1 = true; 
    var winnerDisplay = document.getElementById('winner-display'); 
    winnerDisplay.innerText = " ";
});

