//gameboard, player, computer, and game
const DisplayController = (() => {

    let modal = document.querySelector(".modal");
    let modalContent = document.querySelector(".modal p");
    let closeButton = document.querySelector(".close");
    let display = document.querySelector(".container");
    let restartButton = document.querySelector(".restart");

    restartButton.onclick = function () {
        game.restart();
    }
    closeButton.onclick = function () {
        modal.style.display = "none";
        game.restart();
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            game.restart();

        }
    }

    return { display, modal, modalContent };
})();


const gameBoard = (() => {
    let gameArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    const getArray = () => {
        return gameArray;
    }
    const displayState = () => {
        for (let i = 0; i < 9; i++) {
            DisplayController.display.children[i].innerHTML = gameArray[i];
        }
    };

    const updateState = (index, symbol) => {
        gameArray[index] = symbol;

    };

    const gameWon = (symbol) => {
        if ((gameArray[0] == symbol && gameArray[3] == symbol && gameArray[6] == symbol)
            || (gameArray[1] == symbol && gameArray[4] == symbol && gameArray[7] == symbol)
            || (gameArray[2] == symbol && gameArray[5] == symbol && gameArray[8] == symbol)
            || (gameArray[0] == symbol && gameArray[1] == symbol && gameArray[2] == symbol)
            || (gameArray[3] == symbol && gameArray[4] == symbol && gameArray[5] == symbol)
            || (gameArray[6] == symbol && gameArray[7] == symbol && gameArray[8] == symbol)
            || (gameArray[0] == symbol && gameArray[4] == symbol && gameArray[8] == symbol)
            || (gameArray[6] == symbol && gameArray[4] == symbol && gameArray[2] == symbol)) {
            return true;
        }
        else {
            return false
        }
    }

    const refreshArray = () => {
        gameArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    }




    return { displayState, updateState, getArray, gameWon, refreshArray };
})();

const game = (() => {

    let gameEnd = false;

    const playRound = (unit, symbol) => {
        gameBoard.updateState(unit.id, symbol);
        gameBoard.displayState();

        if (!gameBoard.getArray().includes(' ')) {
            tieGame();
        }
        else if (gameBoard.gameWon(symbol)) {
            gameOver(symbol);
        }
        else {
            console.log(Player.returnTurn());
            if (!gameEnd && Player.returnTurn()) {
                console.log("its players turn");
                //Player.getChoice();
            }
            else if (!gameEnd) {
                console.log("its computers turn");
                Computer.getComputerChoice();
            }
        }




    }
    const play = () => {
        gameBoard.displayState();
        if (Player.returnTurn()) {
            //Player.getChoice();
        }
        else {
            Computer.getComputerChoice();
        }


    }

    const tieGame = () => {
        gameEnd = true;
        DisplayController.modal.style.display = "block";
        DisplayController.modalContent.innerHTML = "You Tied!";

    }

    const gameOver = (symbol) => {
        DisplayController.modal.style.display = "block";
        if (symbol == Player.getSymbol()) {
            DisplayController.modalContent.innerHTML = "You Won!";

        } else {
            DisplayController.modalContent.innerHTML = "You Lost!";
        }
    }

    const restart = () => {
        console.log("game restarted");
        gameEnd = false;
        gameBoard.refreshArray();
        gameBoard.displayState();
        Player.setTurn(true);
        console.log(Player.returnTurn());
        //Player.getChoice();
    }

    return { play, playRound, restart };
})();

const Player = (() => {
    let symbol = "X";
    const getSymbol = () => {
        return symbol;
    };

    let playersTurn = true;
    let indexChosen = 8;

    const setTurn = ( turnBool) => {
        console.log(playersTurn);
        playersTurn = turnBool;
    }
    const returnTurn = () => {
        return playersTurn;
    }

    DisplayController.display.addEventListener("click", function (e) {
        console.log("whyyyy");
        if (playersTurn && e.target.className == "unit" && gameBoard.getArray()[e.target.id] == ' ') {
            playersTurn = false;
            game.playRound(e.target, symbol);
        }
    })

    return {  getSymbol, setTurn, returnTurn };
})();

const Computer = (() => {
    let symbol = "O";
    const getSymbol = () => {
        return symbol;
    }
    const getComputerChoice = () => {
        let randomIndex = Math.floor(Math.random() * 9);
        while (gameBoard.getArray()[randomIndex] != ' ') {
            randomIndex = Math.floor(Math.random() * 9);
            console.log(randomIndex);

        }
        Player.setTurn(true);
        game.playRound(document.getElementById(randomIndex), symbol);
    }

    return { getComputerChoice, getSymbol };
})();



game.play();



