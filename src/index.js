//Global Variables
const gameContainer = document.querySelector(".game-container");
const audio = document.querySelector("#music");

function CreateBoard(dimension = 600, division = 11, difficulty = 10) {
    const gameBoard = document.createElement("div");
    gameBoard.classList = "board";
    gameBoard.style.width = `${dimension}px`;
    gameBoard.style.height = `${dimension}px`;

    const cellList = [];
    let prev = "two";

    for (let x = 0; x < division; x++) {
        for (let y = 0; y < division; y++) {
            const newCell = document.createElement("div");
            newCell.style.width = `${dimension/division -1}px`;
            newCell.style.height = `${dimension/division -1}px`;
            newCell.setAttribute("data-coord", `${x},${y}`);

            //Alternating pattern...
            if (prev == "two") {
                newCell.classList = "cell one";
                prev = "one";
            } else {
                newCell.classList = "cell two";
                prev = "two";
            }

            //Bomb or no...
            if (Math.floor(Math.random()*100) <= difficulty) {
                newCell.setAttribute("data-status", "bomb");

                newCell.style.backgroundColor = "red";
            } else {
                newCell.setAttribute("data-status", "clear");
            }

            cellList.push(newCell);
            gameBoard.appendChild(newCell);
        }
    }

    gameContainer.appendChild(gameBoard);


    return { gameBoard, cellList };
}

function CheckSurroundings(coord, cellList) {
    surroundingCoords = [
        `${coord[0]-1},${coord[1]-1}`,
        `${coord[0]},${coord[1]-1}`,
        `${coord[0]+1},${coord[1]-1}`,

        `${coord[0]-1},${coord[1]}`,
        `${coord[0]+1},${coord[1]}`,

        `${coord[0]-1},${coord[1]+1}`,
        `${coord[0]},${coord[1]+1}`,
        `${coord[0]+1},${coord[1]+1}`,
    ];

    let bombsTouched = 0;

    cellList.forEach((cell) => {
        if (surroundingCoords.includes(cell.getAttribute("data-coord"))) {
            if (cell.getAttribute("data-status") == "bomb") {
                bombsTouched += 1;
            }
        }
    });

    return bombsTouched;
}



const gameComponents = CreateBoard(600, 13, 25);
const cellList = gameComponents.cellList;

gameComponents.gameBoard.addEventListener("click", (event) => {
    if (event.target.classList === "dug") {
        return;
    }

    const coord = event.target.getAttribute("data-coord").split(",").map((value) => Number(value));

    if (event.target.getAttribute("data-status") === "clear") {
        const bombsTouched = CheckSurroundings(coord, cellList);

        event.target.classList = "dug";
        event.target.innerHTML = `${bombsTouched}`;
    } else {
        console.log("BOMB!");

    }

});
