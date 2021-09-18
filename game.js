//gameboard, player, computer, and game
const DisplayController = (() => {

    let modal = document.querySelector(".modal");
    let modalContent = document.querySelector(".modal p");
    let closeButton = document.querySelector(".close");
    let display = document.querySelector(".container");
    let restartButton = document.querySelector(".restart");
    let oButton = document.querySelector(".o");
    let xButton = document.querySelector(".x");

    restartButton.onclick = function() {
        game.restart();
    }
    closeButton.onclick = function() {
        modal.style.height = "0";
        modal.style.width="0";
        game.restart();
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.height= "0";
            modal.style.width="0";
            game.restart();
        }
    }
    oButton.onclick = function() {
        Player.changeSymbol("O");
        game.restart();
    }
    xButton.onclick = function() {
        Player.changeSymbol("X");
        game.restart();
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
            DisplayController.display.children[i].firstChild.innerHTML = gameArray[i];
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

        for (let i = 0; i < 9; i++) {
            DisplayController.display.children[i].firstChild.className = "";
            DisplayController.display.children[i].firstChild.style.opacity = "0";
        }
    }
    return { displayState, updateState, getArray, gameWon, refreshArray };
})();

const game = (() => {

    let gameEnd = false;
    const play = () => {
        gameBoard.displayState();
        if (Player.returnTurn()) {
            //Player.getChoice();
        }
        else {
            Computer.getComputerChoice();
        }
    }
    const playRound =  (unit, symbol) => {
        if (symbol != Player.getSymbol() ) {
            DisplayController.display.children[unit.id].firstChild.style.transitionDelay = "500ms";
        }
        DisplayController.display.children[unit.id].firstChild.className = "animate";

        gameBoard.updateState(unit.id, symbol);
        gameBoard.displayState();
        
        if (gameBoard.gameWon(symbol)) {
            gameOver(symbol);
        }
        else if (!gameBoard.getArray().includes(' ')) {
            tieGame();
        }
        else {
            if (!gameEnd && Player.returnTurn()) {
                //Player.getChoice();
            }
            else if (!gameEnd) {
                Computer.getComputerChoice();
            }
        }
    }
    const tieGame = () => {
        gameEnd = true;
        DisplayController.modal.style.height = "100%";
        DisplayController.modal.style.width = "100%";
        DisplayController.modal.classList.add("animateModal");
        DisplayController.modalContent.innerHTML = "You Tied!";
    }

    const gameOver = (symbol) => {
        DisplayController.modal.style.height = "100%";
        DisplayController.modal.style.width = "100%";
        DisplayController.modal.classList.add("animateModal");

        if (symbol == Player.getSymbol()) {
            DisplayController.modalContent.innerHTML = "You Won!";
        } else {
            DisplayController.modalContent.innerHTML = "You Lost!";
        }
    }

    const restart = () => {
        for (let i  = 0; i < 9 ;i++) {
            DisplayController.display.children[i].firstChild.style.transitionDelay = "0ms";
        }
        gameEnd = false;
        gameBoard.refreshArray();
        gameBoard.displayState();
        DisplayController.modal.classList.remove("animateModal");
        if(Player.getSymbol() == "X") {
            Player.setTurn(true);
        } else {
            Computer.getComputerChoice();
        }
    }
    return { play, playRound, restart };
})();

const Player = (() => {
    let symbol = "X";
    let playersTurn = true;

    const changeSymbol = (letter) => {
        if (letter == "X"){
            symbol = "X";
            Computer.changeSymbol("O");
        }
        else {
            symbol = "O";
            Computer.changeSymbol("X");
        }
    }
    const getSymbol = () => {
        return symbol;
    };
    const setTurn = ( turnBool) => {
        playersTurn = turnBool;
    }
    const returnTurn = () => {
        return playersTurn;
    }
    DisplayController.display.addEventListener("click", function (e) {
        if (playersTurn && e.target.className == "unit" && gameBoard.getArray()[e.target.id] == ' ') {
            playersTurn = false;
            game.playRound(e.target, symbol);
        }
    })
    return {  getSymbol, setTurn, returnTurn, changeSymbol };
})();

const Computer = (() => {
    let symbol = "O";

    const changeSymbol = (letter) => {
        if (letter == "X"){
            symbol = "X";
        }
        else {
            symbol = "O";
        }
    }
    const getSymbol = () => {
        return symbol;
    }
    const getComputerChoice = () => {
        let randomIndex = Math.floor(Math.random() * 9);
        while (gameBoard.getArray()[randomIndex] != ' ') {
            randomIndex = Math.floor(Math.random() * 9);
        }
        Player.setTurn(true);
        game.playRound(document.getElementById(randomIndex), symbol);
    }

    return { getComputerChoice, getSymbol ,changeSymbol};
})();

game.play();



