//gameboard, player, computer, and game

const gameBoard = ( () => {
    let gameArray = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    let display = document.querySelector('.container');

    const getArray = () => {
        return gameArray;
    }
    const displayState = () => {
        for (let i = 0; i < 9;i++) {
            display.children[i].innerHTML = gameArray[i];
        }
    };

    const updateState = ( index,symbol ) => {
        gameArray[index] = symbol;
        
    };


    

    return { displayState, updateState, getArray  };
})();

const game = (() => {

    let turn = "player";
    let gameEnd = false;
    let display = document.querySelector(".container");

    const playRound = (unit,symbol) => {
        gameBoard.updateState(unit.id,symbol);
        gameBoard.displayState();
        if (turn=="player") {
            turn = "computer";
            console.log("its players turn");

            Player.getChoice();
        }
        else {
            turn = "player";
            console.log("its computers turn");
            Computer.getComputerChoice();
        }
    }
    const play = () => {
        gameBoard.displayState();
        if (turn=="player") {
            turn = "computer";
            Player.getChoice();
        }
        else {
            turn = "player";
            Computer.getComputerChoice();
        }
        
        
    }

    return { play, playRound};
})();

const Player = (() => {
    let symbol = "X";
    let display = document.querySelector(".container");
    display.addEventListener("click", listenForChoice);
    let choiceIndex;
    const getSymbol = () => {
        return symbol;
    }
    const getChoice = () => {
        return choiceIndex;
    }
    const listenForChoice = (e) => {
       choiceIndex = e.target.id;
    }

    return {getChoice, getSymbol};
})();

const Computer = (() => {
    let symbol = "O";
    const getSymbol = () => {
        return symbol;
    }
    const getComputerChoice = () => {
        let randomIndex = Math.round(Math.random() * 9);
        console.log(randomIndex);
        while( gameBoard.getArray()[randomIndex] != ' ') {
            randomIndex = Math.round(Math.random() * 9);
        }
        game.playRound( document.getElementById(randomIndex),symbol);
    }

    return {getComputerChoice, getSymbol};
})();

game.play();



