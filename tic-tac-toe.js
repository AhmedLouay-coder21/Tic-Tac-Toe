// create game board (3x3)
function creatGameBoard()
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
        gameBoard.appendChild(box);
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
        creatGameBoard();
    });
    pvc.addEventListener("click", function(event) 
    {
        // clear the buttons right after the user chooses the game mode
        clearButtons(pvp, pvc);
        //in case of pvc, draw the grid and wait till the user to play and then choose a random but not taken box to play
        creatGameBoard();
    });
    function clearButtons(pvp, pvc)
    {
        pvp.style.display = "none";
        pvc.style.display = "none";
    }
}
chooseMode();