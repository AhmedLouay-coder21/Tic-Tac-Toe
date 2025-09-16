//players initial scores
let p1s = document.createElement("div");
let p2s = document.createElement("div");
let p1sName = document.createElement("div");
let p2sName = document.createElement("div");

p1sName.style.display = "none";
p2sName.style.display = "none";
p1sName.style.color = "white";
p2sName.style.color = "white";

p1s.style.display = "none";
p2s.style.display = "none";
p1s.style.color = "white";
p2s.style.color = "white";

p1s.textContent = 0;
p2s.textContent = 0;
// create game board (3x3)
function createGameBoard(player1, player2)
{
        const gameBoardObject = {
        cells: [],   // this is 9 boxes (the actual board)
    };
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    //make a 3 * 3 gameBoard
    for(let i = 0; i < 3 * 3; i++)
    {
        box = document.createElement("div");

        box.style.flex = `0 0 ${100 / 3}%`; 
        box.style.height = `calc(100% / ${3})`; 

        box.style.border = "1px solid black";
        box.style.backgroundColor = "white";

        gameBoardObject.cells.push(box);
        gameBoard.appendChild(gameBoardObject.cells[i]);
    }
    gameBoardObject.cells;
    //start the game
    playGame(gameBoardObject.cells, player1, player2);
}
//make the player choose if they want to play human to human or human to cpu
function startGame()
{
    const startGame = document.getElementById("startGame");
    const player1Name = document.getElementById("Player1");
    const player2Name = document.getElementById("Player2");
    const submitPlayer1Name = document.getElementById("submitPlayer1Name");
    const submitPlayer2Name = document.getElementById("submitPlayer2Name");
    
    const playersScores = document.getElementById("playersScores");
    playersScores.appendChild(p1sName);
    playersScores.appendChild(p2sName);
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
            const player1 = document.getElementById("player1").value;
            submitPlayer2Name.addEventListener("click", function(event)
            {
                event.preventDefault();
                player2Name.style.display = "none";
                const player2 = document.getElementById("player2").value;

                p1sName.textContent = `${player1} score : `;
                p2sName.textContent = `${player2} score : `;
                
                p1sName.style.display = "flex";
                p2sName.style.display = "flex";

                p1sName.appendChild(p1s);
                p2sName.appendChild(p2s);

                p1s.style.display = "flex";
                p2s.style.display = "flex";

                // draw the game board
                createGameBoard(player1, player2);
            });
        });
    });
    function clearButtons(startGame)
    {
        startGame.style.display = "none";
    }
}
//this function handles how the game goes from telling the full cells to whether a player won or not
function playGame(cells, player1, player2)
{
    const cellNumber = cells;
    let flag = 0;
    let turns = 0;
    const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
    ];
    const fullCells = Array(9).fill(null);
    let gameActive = true;
    //play until some one wins or the turns played are 9
    cellNumber.forEach((cell, index) => {
        cell.addEventListener("click", function handleClick (event) {
            if (!gameActive) 
            {
                alert("The game is over, click play again to start a new game!");
                return;
            }
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
                event.target.style.backgroundSize = "80% 80%";
                event.target.style.backgroundPosition = "center";
                event.target.style.backgroundRepeat = "no-repeat";

                fullCells[index] = "x";
            }
            //player 2 turn
            else
            {
                // draw the O and align it
                event.target.style.backgroundImage = "url('https://media.geeksforgeeks.org/wp-content/uploads/20201230114434/o-300x300.png')";
                event.target.style.backgroundSize = "80% 80%";
                event.target.style.backgroundPosition = "center";
                event.target.style.backgroundRepeat = "no-repeat";

                fullCells[index] = "o";
            }
            turns ++;
            //check whether that any of the winning combinations exists and someone has won.
            for(const [a,b,c] of winningCombos) {
                if(fullCells[a] && fullCells[a] === fullCells[b] && fullCells[a] === fullCells[c]) {
                    flag = 1;
                    alert(`${fullCells[a] === "x" ? `${player1}` : `${player2}`} wins!`);
                    if(fullCells[a] == "x")
                    {
                        p1s.textContent = scoreCounter(p1s.textContent);
                    }
                    else
                    {
                        p2s.textContent = scoreCounter(p2s.textContent);
                    }
                    gameActive = false;
                    startNewGame(player1,player2);
                    return;
                }
            }
            //all turns are over and no one won
            if(turns == 9 && flag == 0)
            {
                alert("Its a draw!");
                startNewGame(player1,player2);
            }
            });
        });
}
function startNewGame(player1,player2)
{
    // create , adjust and display new game button
    const newGameButton = document.createElement("button");
    
    newGameButton.textContent = "Play again, retrieve your throne!";
    newGameButton.style.marginTop = "5%";
    newGameButton.style.backgroundColor = "#3882f6";
    newGameButton.style.color = "white";
    newGameButton.style.border = "none";
    newGameButton.style.borderRadius = "2px";
    newGameButton.style.height = "30px";

    const NewGameContainer = document.getElementById("startNewGameButton");
    NewGameContainer.innerHTML = "";
    NewGameContainer.appendChild(newGameButton);
    //on click clear the grid and start drawing it again using createGameBoard function. 
    newGameButton.addEventListener("click", (event) =>
    {
        event.preventDefault();
        NewGameContainer.removeChild(newGameButton);
        createGameBoard(player1,player2);
    })
}
function scoreCounter(ps)
{
    ps ++;
    return ps;
}
startGame();