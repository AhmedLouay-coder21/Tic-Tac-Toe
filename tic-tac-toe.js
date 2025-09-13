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
    const pvc = document.getElementById("pvc");
    const pvp = document.getElementById("pvp");
    pvp.addEventListener("click", function(event)
    {
        // clear the buttons right after the user chooses the game mode
        clearButtons(pvp, pvc);
        //in case of pvp, draw the grid and keep exchanging turns between players
        const cells = createGameBoard();
        const gameMode = "pvp";
        playGame(gameMode, cells);
    });
    pvc.addEventListener("click", function(event) 
    {
        // clear the buttons right after the user chooses the game mode
        clearButtons(pvp, pvc);
        //in case of pvc, draw the grid and wait till the user to play and then choose a random but not taken box to play
        const cells = createGameBoard();
        const gameMode = "pvc";
        playGame(gameMode, cells);
    });
    function clearButtons(pvp, pvc)
    {
        pvp.style.display = "none";
        pvc.style.display = "none";
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