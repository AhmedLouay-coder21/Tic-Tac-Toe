// create game board (3x3)
function createGameBoard()
{
        const gameBoardObject = {
        cells: [],   // this is 9 boxes (the actual board)
    };
    const gameBoard = document.getElementById("gameBoard");
    for(let i = 0; i < 3 * 3; i++)
    {
        box = document.createElement("div");

        box.style.flex = `0 0 ${100 / 3}%`; 
        box.style.height = `calc(100% / ${3})`; 

        box.style.border = "1px solid black";

        gameBoardObject.cells.push(box);
        gameBoard.appendChild(gameBoardObject.cells[i]);
    }
    return function()
    {
        return gameBoardObject.cells;
    }
}
//make the player choose if they want to play human to human or human to cpu
function chooseMode()
{
    const startGame = document.getElementById("startGame");
    const player1Name = document.getElementById("Player1");
    const player2Name = document.getElementById("Player2");
    const submitPlayer1Name = document.getElementById("submitPlayer1Name");
    const submitPlayer2Name = document.getElementById("submitPlayer2Name");
    
    startGame.addEventListener("click", function(event)
    {
        // clear the buttons right after the user clicks startGame
        clearButtons(startGame);
        //display the enter player 1 name field
        player1Name.style.display = "flex";
        //wait for the player 1 to enter his name before make enter player 2 name field appears
        submitPlayer1Name.addEventListener("click", function(event)
        {
            event.preventDefault();
            player1Name.style.display = "none";
            player2Name.style.display = "flex";
            submitPlayer2Name.addEventListener("click", function(event)
            {
                event.preventDefault();
                player2Name.style.display = "none";
                // draw the game board
                const cells = createGameBoard();
                const gameMode = "pvp";
                playGame(gameMode, cells);
            });
        });
    });
    function clearButtons(startGame)
    {
        startGame.style.display = "none";
    }
}
chooseMode();
//this function handles how the game goes from telling the full cells to whether a player won or not
function playGame(gameMode, cells)
{
    const cellNumber = cells();
    let flag = 0;
    let turns = 0;
    const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
    ];
    const fullCells = Array(9).fill(null);
    //if player vs player change turns
    if(gameMode == "pvp")
    {
        //play until some one wins or the turns played are 9
        cellNumber.forEach((cell, index) => {
            cell.addEventListener("click", (event) => {
                if(fullCells[index] !== null)
                {
                    alert("full cell");
                    return;
                }
                // player 1 turn
                if( turns % 2 == 0)
                {
                    // draw the X and align it
                    event.target.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/5038/5038500.png')";
                    event.target.style.backgroundSize = "230px 230px";
                    fullCells[index] = "x";
                }
                //player 2 turn
                else
                {
                    // draw the O and align it
                    event.target.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/3524/3524377.png')";
                    event.target.style.backgroundSize = "220px 230px";
                    fullCells[index] = "o";
                }
                turns ++;
                //check whether that any of the winning combinations exists and someone has won.
                for(const [a,b,c] of winningCombos) {
                    if(fullCells[a] && fullCells[a] === fullCells[b] && fullCells[a] === fullCells[c]) {
                        flag = 1;
                        alert(`player ${fullCells[a] === "x" ? "1" : "2"} wins!`);
                        startNewGame(fullCells,cellNumber);
                        return;
                    }
                }
                //all turns are over and no one won
                if(turns == 9 && flag == 0)
                {
                    alert("Its a draw!");
                }
                });
            });
    }
}
function startNewGame(array,object)
{
    const newGameButton = document.createElement("button");
    const form = document.getElementById("form");
    form.appendChild(newGameButton);
    newGameButton.addEventListener("click", (event) =>
    {
        array = [];
        object = {};
        playGame("pvp",object);
        createGameBoard();
    })
}